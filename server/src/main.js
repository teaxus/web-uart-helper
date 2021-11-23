const WebSocketServer = require("ws").Server;
const configHelper = require("./configHelper.js");
const { makeDirRecursionSync, mkJsonStr } = require("./tools.js");
const uartHelper = require("./uartHelper.js");
const constVal = require("./constVal.js");
const fs = require("fs");

makeDirRecursionSync(constVal.cache); //  创建缓存目录

wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function (ws) {
  // ws发送方法
  function sendData(code, actToClient, data) {
    ws.send(
      mkJsonStr({
        code,
        data,
        actToClient,
      })
    );
  }

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
    // 通知前端收到数据
    sendData(0, "rxData", { rxData: data });
  });
  ws.on("message", function (message) {
    let dictRequest = JSON.parse(message);
    switch (dictRequest.actToDrive) {
      // 发送信息
      case "tranTXData":
        console.log(dictRequest.data.data);
        uartHelper.sendData(dictRequest.data);
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
        break;
    }
    console.log(dictRequest);
  });
});
