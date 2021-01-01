import socketTools from "@/Tools/socketTools.js";
let arrBindMap = [];

function _keepalive(data) {
  // console.log("keepalive ~ data", data);
}

function _msgProcess(data) {
  if (data.code == 0 && data.actToClient != null) {
    if (data.actToClient == "keepalive") {
      _keepalive(data.data);
    }
    for (let index in arrBindMap) {
      let dictBindObj = arrBindMap[index];
      if (dictBindObj.act == data.actToClient) {
        eval(`dictBindObj.obj.${dictBindObj.keyPath} = data.data${dictBindObj.srcDataKeyPath == null ? '':'.'+dictBindObj.srcDataKeyPath}`);
      }
    }
  }
}

//  API方法
function _makeSendData(act, data) {
  socketTools.sendData({
    code: 0,
    data,
    actToDrive: act,
  });
}

let API = {
  //  查询串口端口
  getPort() {
    _makeSendData("getPorts");
  },
  // 打开端口
  openPort(param) {
    _makeSendData("openPort", param);
  },
  // 关闭端口
  shutdownUart() {
    _makeSendData("shutdownUart");
  },
};

/**
 * 启动串口服务器连接.
 * @param {String} host 服务器路径(包含端口,例:127.0.0.1:8181).
 */
function startup(host) {
  socketTools
    .init(`ws://${host}`)
    .connect()
    .addOnMessageCallback(_msgProcess);
  return exportObj;
}

/**
 * 绑定对象用于数据自动刷新.
 * @param {object} obj 绑定的vue对象.
 * @param {String} keyPath 绑定的变量路径，如data里面的arr数组，这里就填“arr”.
 * @param {String} act 在哪个act触发绑定.
 * @param {String} srcDataKeyPath 绑定原数据的变量路径.
 */
function bindValWithObj(obj, keyPath, act, srcDataKeyPath) {
  let dictPush = { act, obj, keyPath };
  if(srcDataKeyPath != null){
    dictPush.srcDataKeyPath = srcDataKeyPath;
  }
  arrBindMap.push(dictPush);
}

let exportObj = { startup, bindValWithObj, API };
export default exportObj;
