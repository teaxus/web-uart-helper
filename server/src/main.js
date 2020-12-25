const WebSocketServer = require("ws").Server;
const SerialPort = require("serialport");
// const http = require("http");
function mkJsonStr(obj) {
  return JSON.stringify(obj);
}

let serialPort = null;
wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function (ws) {
  console.log("client connected");
  ws.send(mkJsonStr({ code: 0, msg: "client connected" }));

  ws.on("message", function (message) {
    let dictRequest = JSON.parse(message);
    switch (dictRequest.serverAct) {
      case "keepalive": // 向服务端保持通讯并且返回串口有关的数据
        let dictRes = {};
        // 返回端口情况
        break;
      case "shutDownUart":
        if(serialPort != null){
          serialPort.close();
          serialPort = null;
        }
        break;
      case "getPorts":
        SerialPort.list().then((ports) => {
          let arrRespon = [];
          ports.forEach(function (port) {
            arrRespon.push(port);
          });
          ws.send(
            mkJsonStr({
              code: 0,
              data: arrRespon,
              serverAct: dictRequest.serverAct,
            })
          );
        });
        break;
    }
    console.log(dictRequest);
  });
});
let portName = "/dev/tty.usbserial-3140"; //定义串口名
serialPort = new SerialPort(portName, {
  baudRate: 9700, //波特率
  dataBits: 8, //数据位
  parity: "none", //奇偶校验
  stopBits: 1, //停止位
  flowControl: false,
  autoOpen: false,
});
serialPort.open(function (error) {
  if (error) {
    console.log("打开端口" + portName + "错误：" + error);
  } else {
    console.log("打开端口成功，正在监听数据中");
    serialPort.on("data", function (data) {
      console.log("Data:", data);
      serialPort.write(Buffer.from("Hi Mom!你好", "utf8")); //  仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的
      // serialPort.write(Buffer.from('AABB', 'hex'))  //  将每个字节编码为两个十六进制字符
    });
  }
});

// let server = http.createServer(function (request, response) {
//   response.writeHead(200, { "Content-Type": "application/json" }); //application/json：代表响应的是json
//   switch (request.url) {
//     case "/":
//       console.log(request);
//     case "/getPort":
//       console.log("🚀 ~ request api------getPort");
//       SerialPort.list().then((ports) => {
//         let arrRespon = [];
//         ports.forEach(function (port) {
//           arrRespon.push(port);
//         });
//         response.write(mkJsonStr(arrRespon));
//         response.end();
//       });
//       break;
//   }
// });
// server.listen(8000);
