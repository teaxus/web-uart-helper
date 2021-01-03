const SerialPort = require("serialport");
let serialPort = null;
let ondata_handle = [];

function _rxData(data) {
  ondata_handle.forEach((cb) => {
    let rxStr = data.toString("ascii");
    cb(rxStr);
  });
}

let exportObj = {
  getPort(callback) {
    SerialPort.list().then((ports) => {
      let arrRespon = [];
      ports.forEach(function (port) {
        arrRespon.push(port);
      });
      callback(arrRespon);
    });
  },

  /**
   * 用于打开端口，会传入para字典里面包含了连接串口的参数.
   * @param {object} param  portName:端口名称/baudRate:波特率/dataBits:数据位/parity:奇偶校验/stopBits:停止位
   */
  openPort(param,errorCallback) {
    serialPort = new SerialPort(param.connectPortName, {
      baudRate: parseInt(param.baudRate), //波特率
      dataBits: parseInt(param.dataBits), //数据位
      parity: param.parity, //奇偶校验
      stopBits: parseInt(param.stopBits), //停止位
      flowControl: param.flowControl,
      autoOpen: false,
    });
    serialPort.isClose = true;
    serialPort.open(function (error) {
      if (error) {
        console.log("打开端口" + param.connectPortName + "错误：" + error);
        if(errorCallback != null){
          errorCallback(error);
        }
      } else {
        console.log("打开端口成功，正在监听数据中");
        serialPort.isClose = false;
      }
    });
    serialPort.on("data", _rxData);
  },
  closePort() {
    try {
      if (serialPort != null) {
        serialPort.close();
        serialPort = null;
        console.log("端口已关闭")
      }
    } catch (err) {}
  },
  addOnDataCallback(callback) {
    ondata_handle.push(callback);
  },
  portIsOpen(){
    if(serialPort == null){
      return false;
    }
    return serialPort.closing == false;
  }
};
module.exports = exportObj;
