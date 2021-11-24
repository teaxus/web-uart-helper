import { Notify } from "vant";
import uartServer from "@/Tools/uartServer.js";

export default {
  name: "TXPanel",
  components: {},
  props: {
    height: {
      type: Number,
    },
  },
  data() {
    return {
      uart_is_opened: false,
      showSendrecordFlag: false,
      showAutoSendFlag: false,
      showAddAutoSendConfigFlag: false,
      autoSendInterval: null, // 自动发送时间间隔（用于模态窗口提交用）
      uartStatus: {}, // 发送状态，用来查询tx的数量和速度
      dictTrueData: {
        // 真正的数据
        TEXT: "",
        HEX: "",
      },
      sendRecord: {},
      autoSendMap: {}, // 自动发送字典
      inputType: localStorage.txInputType || "TEXT", //  默认Text（16进制和文字同时显示） ，16进制是HEX
    };
  },
  computed: {
    inputData: {
      get: function() {
        return this.dictTrueData[this.inputType];
      },
      set: function(val) {
        return (this.dictTrueData[this.inputType] = val);
      },
    },
  },
  watch: {
    inputType: function(newVal) {
      localStorage.txInputType = newVal;
    },
    uart_is_opened: function() {
      this.checkAutoSendTask();
    },
  },
  mounted() {
    uartServer.bindValWithObj(
      this,
      "uart_is_opened",
      "keepalive",
      "state.serialOpened"
    );
    uartServer.bindValWithObj(this, "uartStatus", "updateUartStatus");
    if (localStorage.txInputData || null) {
      this.inputData = localStorage.txInputData;
    }
    if (sessionStorage.txRecord != null) {
      this.sendRecord = JSON.parse(sessionStorage.txRecord);
    }
    // 初始化自动发送的数据
    if (sessionStorage.autoTxConfig != null) {
      localStorage.txInputData = this.inputData;
      this.autoSendMap = JSON.parse(sessionStorage.autoTxConfig);
      this.checkAutoSendTask();
    }
  },
  methods: {
    inpuDataChange(e) {
      if (this.inputType == "HEX") {
        let data = e.data;
        if (data != null) {
          data = data.toLowerCase();
          if ("1234567890abcdef".indexOf(data) == -1) {
            //输入无效的数据
            this.inputData = this.inputData
              .substr(0, this.inputData.length - 1)
              .toUpperCase();
            Notify({ type: "warning", message: "请输入正确格式的16进制数据" });
          }
        }
        this.inputData = this.inputData.toUpperCase();
      }
    },
    checkTxRecord() {
      this.showSendrecordFlag = true;
    },
    clearTxCache() {
      uartServer.API.clearTxCache();
      this.inputData = "";
      this.sendRecord = {};
      sessionStorage.txRecord = JSON.stringify({});
    },
    // 校验发送的数据是否符合规范
    verifySendData() {
      if (!this.inputData) {
        Notify({ type: "warning", message: "不能发送空字符串" });
        return false;
      } else if (this.inputType == "HEX" && this.inputData.length % 2 != 0) {
        Notify({ type: "warning", message: "请输入正确的16进制数据" });
        return false;
      }
      return true;
    },
    // 发送数据
    sendData() {
      if (this.verifySendData() == false) return;
      uartServer.API.tranTXData({
        dataType: this.inputType,
        data: this.inputData,
      });
      this._updateSendMessage(this.inputType, this.inputData);
    },
    resendData(data) {
      const arrTmp = data.split("|");
      const inputType = arrTmp[0];
      const inputData = arrTmp[1];
      uartServer.API.tranTXData({ dataType: inputType, data: inputData });
      this._updateSendMessage(inputType, inputData);
    },
    reinputData(data) {
      const arrTmp = data.split("|");
      this.inputType = arrTmp[0];
      this.inputData = arrTmp[1];
    },
    delRecord(data) {
      delete this.sendRecord[data];
      sessionStorage.txRecord = JSON.stringify(this.sendRecord);
    },
    _updateSendMessage(inputType, inputData) {
      const key = inputType + "|" + inputData;
      const times = this.sendRecord[key] || 0;
      this.sendRecord[key] = times + 1;
      sessionStorage.txRecord = JSON.stringify(this.sendRecord);
    },
    // 添加自动发送到字典
    addAutoSendCommand() {
      if (this.verifySendData() == false) return;
      if ((this.autoSendInterval || null) == null) {
        Notify({ type: "warning", message: "必须输入相隔时间" });
        return;
      }
      if (parseInt(this.autoSendInterval) <= 20) {
        Notify({ type: "warning", message: "间隔必须大于20MS" });
        return;
      }
      const inputType = this.inputType;
      const inputData = this.inputData;
      const key = inputType + "|" + inputData;
      if (this.autoSendMap[key] != null) {
        Notify({ type: "warning", message: "已经添加" });
        this.showAutoSendFlag = true;
        this.showAddAutoSendConfigFlag = false;
        return;
      }
      let dicTmp = {};
      dicTmp.autoSendInterval = this.autoSendInterval; // 相隔时间
      dicTmp.txCount = 0; // 发送数量
      dicTmp.sendStatus = true; // 发送状态默认是自动发送
      dicTmp.intervalID = null; // 默认是没有轮询ID需要在watch监听sendStatus
      this.autoSendMap[key] = dicTmp;
      sessionStorage.autoTxConfig = JSON.stringify(this.autoSendMap);

      // 还原状态
      this.showAddAutoSendConfigFlag = false;
      this.showAutoSendFlag = true;
      this.autoSendInterval = null;
      this.checkAutoSendTask();
      Notify({ type: "success", message: "添加成功" });
    },
    delAutoSend(key) {
      clearInterval(this.autoSendMap[key].intervalID);
      delete this.autoSendMap[key];
      sessionStorage.autoTxConfig = JSON.stringify(this.autoSendMap);
    },
    // 更改自动发送状态
    changeAutoStatus(key, sendStatus) {
      let dicTmp = this.autoSendMap[key];
      dicTmp.sendStatus = sendStatus;
      this.autoSendMap[key] = dicTmp;
      this.checkAutoSendTask();
    },
    checkAutoSendTask() {
      for (let key in this.autoSendMap) {
        let dicTmp = this.autoSendMap[key];
        // 需要停用定时发送,如果端口关闭，会结束所有自动发送的任务
        if (
          (dicTmp.sendStatus == false || !this.uart_is_opened) &&
          dicTmp.intervalID != null
        ) {
          clearInterval(dicTmp.intervalID);
          dicTmp.intervalID = null;
        }
        // 可以开始定时发送任务
        else if (
          dicTmp.sendStatus &&
          this.uart_is_opened &&
          dicTmp.intervalID == null
        ) {
          const arrTmp = key.split("|");
          const inputType = arrTmp[0];
          const inputData = arrTmp[1];
          dicTmp.intervalID = setInterval(() => {
            // 必须是开了自动发送并且端口是开的才能操作
            uartServer.API.tranTXData({ dataType: inputType, data: inputData });
            dicTmp.txCount++;
          }, dicTmp.autoSendInterval);
        }

        this.autoSendMap[key] = dicTmp;
        sessionStorage.autoTxConfig = JSON.stringify(this.autoSendMap);
      }
    },
    autoSendConfigDidChange(key) {
      let dicTmp = this.autoSendMap[key];
      if (parseInt(dicTmp.autoSendInterval) <= 20) {
        Notify({ type: "warning", message: "间隔必须大于20MS" });
        return;
      }
      clearInterval(dicTmp.intervalID);
      dicTmp.intervalID = null;
      this.autoSendMap[key] = dicTmp;
      this.checkAutoSendTask();
    },
  },
};
