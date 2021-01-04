const WebSocketServer = require("ws").Server;
const SerialPort = require("serialport");
const configHelper = require("./configHelper.js");
const { makeDirRecursionSync } = require("./tools.js");
const uartHelper = require("./uartHelper.js");
const constVal = require("./constVal.js");
const fs = require("fs");

makeDirRecursionSync(constVal.cache); //  创建缓存目录

function mkJsonStr(obj) {
  let return_json_str = JSON.stringify(obj);
  return return_json_str;
}
wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function (ws) {
  // 发送方法
  function sendData(code, actToClient, data) {
    ws.send(
      mkJsonStr({
        code,
        data,
        actToClient,
      })
    );
  }

  function sendError(code, showMsg){
    sendData(code, "showError", {showMsg});
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
  // 添加收到信息的处理回调
  uartHelper.addOnDataCallback((data) => {
    if(fs.existsSync(constVal.rxRecordPath)){
      // 增加
      fs.appendFileSync(constVal.rxRecordPath, data);
    }
    else{
      // 创建
      fs.writeFileSync(constVal.rxRecordPath, data);
    }

    sendData(0,"rxData",{rxData:data})
  });
  ws.on("message", function (message) {
    let dictRequest = JSON.parse(message);
    switch (dictRequest.actToDrive) {
      case "getRxRecord":
        sendData(0, "rxRecord", fs.existsSync(constVal.rxRecordPath) ? fs.readFileSync(constVal.rxRecordPath, "ASCII"):"");
        break;
      case "openPort":
        uartHelper.openPort(dictRequest.data,function(error){
          sendError(1,"请选择正确的端口");
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