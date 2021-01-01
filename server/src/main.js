const WebSocketServer = require("ws").Server;
const SerialPort = require("serialport");
const configHelper = require("./configHelper.js");
const uartHelper = require("./uartHelper.js");
function mkJsonStr(obj) {
  let return_json_str = JSON.stringify(obj);
  return return_json_str;
}

let serialPort = null;
let keepaliveTime = 100; // ms
wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function (ws) {
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
  }, keepaliveTime);
  ws.on("message", function (message) {
    let dictRequest = JSON.parse(message);
    switch (dictRequest.actToDrive) {
      case "keepalive": // 向服务端保持通讯并且返回串口有关的数据
        let dictRes = {};
        // 返回端口情况
        break;
      case "openPort":
        uartHelper.openPort(dictRequest.data);
        break;
      case "shutdownUart":
        uartHelper.closePort();
        break;
      case "getPorts":
        uartHelper.getPort((arrRespon) => {
          ws.send(
            mkJsonStr({
              code: 0,
              data: arrRespon,
              actToClient: "updateDriveList",
            })
          );
        });
        break;
    }
    console.log(dictRequest);
  });
});

// let portName = "/dev/tty.usbserial-3120"; //定义串口名
// serialPort = new SerialPort(portName, {
//   baudRate: 9600, //波特率
//   dataBits: 8, //数据位
//   parity: "none", //奇偶校验
//   stopBits: 1, //停止位
//   flowControl: false,
//   autoOpen: false,
// });
// serialPort.isClose = false;
// serialPort.open(function (error) {
//   if (error) {
//     console.log("打开端口" + portName + "错误：" + error);
//   } else {
//     console.log("打开端口成功，正在监听数据中");
//     serialPort.isClose = true;
//   }
// });
// serialPort.on("data", function (data) {
//   console.log("Data:", data);
//   console.log("Data to string:", data.toString('ascii'));
//   serialPort.write(Buffer.from("Hi Mom!", "ascii")); //  仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的
//   // serialPort.write(Buffer.from('AABB', 'hex'))  //  将每个字节编码为两个十六进制字符
// });
