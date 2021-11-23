const WebSocketServer = require("ws").Server;
const configHelper = require("./configHelper.js");
const {
  makeDirRecursionSync,
  mkJsonStr,
  cacheSet,
  cacheGet,
} = require("./tools.js");
const uartHelper = require("./uartHelper.js");
const constVal = require("./constVal.js");
const fs = require("fs");
let wsHandle = null;

makeDirRecursionSync(constVal.cache); //  创建缓存目录

// ws发送方法
function sendData(code, actToClient, data) {
  if(wsHandle != null) {
    wsHandle.send(
      mkJsonStr({
        code,
        data,
        actToClient,
      })
    );
  }
}

// 周期任务
setInterval(() => {
  const oldRXStatus = cacheGet("rxDataInfo") || {};
  const oldTXStatus = cacheGet("txDataInfo") || {};

  
  sendData(0, "updateUartStatus", {rxStatus: oldRXStatus, txStatus: oldTXStatus});

  // 防止数据呆住，所以要对一些数据进行递减处理
  oldRXStatus.speedBytePerSecond = (oldRXStatus.speedBytePerSecond || 0)/2;
  oldTXStatus.speedBytePerSecond = (oldTXStatus.speedBytePerSecond || 0)/2;
  if(oldRXStatus.speedBytePerSecond < 0.001) {
    oldRXStatus.speedBytePerSecond = 0;
  }
  if(oldTXStatus.speedBytePerSecond < 0.001) {
    oldTXStatus.speedBytePerSecond = 0;
  }
  cacheSet("rxDataInfo", oldRXStatus);
  cacheSet("txDataInfo", oldTXStatus);
}, 500);
wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function (ws) {
  wsHandle = ws;
  function sendError(code, showMsg) {
    sendData(code, "showError", { showMsg });
  }

  console.log("client connected");
  ws.send(mkJsonStr({ code: 0, msg: "client connected" }));
  setInterval(function () {
    ws.send(
      mkJsonStr({
        code: 0,
        actToClient: "keepalive",
        data: {
          config: {
            clientStringDecode: "ASCII",
            uartDriveStringDecode: "ASCII",
          },
          state: {
            serialOpened: uartHelper.portIsOpen(),
          },
        },
      })
    );
  }, constVal.keepaliveTime);

  uartHelper.ondata_handle = []; // 重置所有监听操作
  // 添加收到信息的处理回调
  uartHelper.addOnDataCallback((data) => {
    if (fs.existsSync(constVal.rxRecordPath)) {
      // 增加
      fs.appendFileSync(constVal.rxRecordPath, data);
    } else {
      // 创建
      fs.writeFileSync(constVal.rxRecordPath, data);
    }

    // 更新当前的接收状态---Begin
    const oldRXStatus = cacheGet("rxDataInfo");
    const nowDate = new Date().getTime(); // 当前时间
    let nowStatus = { rxDate: nowDate, rxCount: data.split(" ").length-1 };
    if (oldRXStatus != null) {
      const lastRXDate = oldRXStatus.rxDate;  // 最后一次更新的时间
      const speed = nowStatus.rxCount/ ((nowDate-lastRXDate)/1000); // 单位是byte/2
      nowStatus.speedBytePerSecond = ((nowStatus.speedBytePerSecond || 0) + speed)/2;
      nowStatus.rxCount += oldRXStatus.rxCount;
    }
    cacheSet("rxDataInfo", nowStatus);
    // 更新当前的接收状态---End

    // 通知前端收到数据
    sendData(0, "rxData", { rxData: data });
  });
  ws.on("message", function (message) {
    let dictRequest = JSON.parse(message);
    switch (dictRequest.actToDrive) {
      // 发送信息
      case "tranTXData":
        uartHelper.sendData(dictRequest.data);
        // 更新当前的接收状态---Begin
        const oldTXStatus = cacheGet("txDataInfo");
        const nowDate = new Date().getTime(); // 当前时间
        let nowStatus = { txDate: nowDate, txCount: dictRequest.data.data.length/(dictRequest.data.dataType == "HEX" ? 2:1) };
        if (oldTXStatus != null) {
          const lastTXDate = oldTXStatus.txDate;  // 最后一次更新的时间
          const speed = nowStatus.txCount/ ((nowDate-lastTXDate)/1000/(dictRequest.data.dataType == "HEX" ? 2:1)); // 单位是byte/2
          nowStatus.speedBytePerSecond = ((nowStatus.speedBytePerSecond || 0) + speed)/2;
          nowStatus.txCount += oldTXStatus.txCount;
        }
        cacheSet("txDataInfo", nowStatus);
        // 更新当前的接收状态---End
        break;
      // 获取收到的信息
      case "getRxRecord":
        sendData(
          0,
          "rxRecord",
          fs.existsSync(constVal.rxRecordPath)
            ? fs.readFileSync(constVal.rxRecordPath, "ASCII")
            : ""
        );
        break;
      case "openPort":
        uartHelper.openPort(dictRequest.data, function (error) {
          sendError(1, "请选择正确的端口");
        });
        break;
      case "shutdownUart":
        uartHelper.closePort();
        break;
      case "getPorts":
        uartHelper.getPort((arrRespon) => {
          sendData(0, "updateDriveList", arrRespon);
        });
        break;
      case "clearRxCache":
        fs.writeFileSync(constVal.rxRecordPath, "");
        const oldRXStatus = cacheGet("rxDataInfo");
        oldRXStatus.rxCount = 0;
        cacheSet("rxDataInfo", oldRXStatus);
        break;
      case "clearTxCache":
        const txStatus = cacheGet("txDataInfo");
        txStatus.txCount = 0;
        cacheSet("txDataInfo", txStatus);
        break;
    }
    console.log(dictRequest);
  });
});
