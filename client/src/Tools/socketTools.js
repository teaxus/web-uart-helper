let connect_url = null;
let ws_handle = null;
let reconnect_time = 1000; // 重连接时间
let onmessage_handle = [];

function _setupCallBack() {
  ws_handle.onopen = function() {
    //当WebSocket创建成功时，触发onopen事件
    console.log("open");
  };
  ws_handle.onmessage = function(e) {
    //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
    onmessage_handle.forEach((cb) => {
      cb(JSON.parse(e.data));
    });
  };
  ws_handle.onclose = function(e) {
    //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
    console.log("close");
    reconnect();
  };
  ws_handle.onerror = function(e) {
    //如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
    console.log(error);
    reconnect();
  };
}

function connect() {
  // socket连接
  ws_handle = new WebSocket(connect_url); //创建WebSocket连接
  _setupCallBack();
  return exportObj;
}
function reconnect() {
  console.warn("web socket connect fail try reconnect");
  setTimeout(connect, reconnect_time);
  return exportObj;
}
function sendData(obj) {
  ws_handle.send(JSON.stringify(obj)); //将消息发送到服务端
  return exportObj;
}
function addOnMessageCallback(callback) {
  onmessage_handle.push(callback);
}

function init(url) {
  connect_url = url;
  return exportObj;
}

let exportObj = {
  init,
  connect,
  sendData,
  addOnMessageCallback,
};
export default exportObj;
