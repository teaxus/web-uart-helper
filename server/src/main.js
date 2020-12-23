var WebSocketServer = require("ws").Server;
var SerialPort = require("serialport");
var http = require("http");

SerialPort.list().then((ports) => {
  ports.forEach(function (port) {
    console.log("--------------------------");
    console.log(port);
    console.log(port.path);
    console.log(port.pnpId);
    console.log(port.manufacturer);
    console.log("++++++++++++++++++++++++++++");
  });
});
wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function (ws) {
  console.log("client connected");
  ws.send("client connected");

  ws.on("message", function (message) {
    console.log(message);
  });
});

var server = http.createServer(function (request, response) {
  switch (request.url) {
    case "/":
      console.log(request);
    case "/getPort":
      console.log("getPort");
      break;
  }
  response.write(JSON.stringify({ name: "Hifff" }));
  response.end();
});
server.listen(8000);
