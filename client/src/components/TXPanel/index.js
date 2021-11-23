import { Notify } from "vant";
import uartServer from "@/Tools/uartServer.js";

export default {
  name: "TXPanel",
  components: {
  },
  props:{
    height: {
      type: Number,
    }
  },
  data() {
    return {
      showSendrecordFlag: false,
      uartStatus: {},
      dictTrueData: {
        // 真正的数据
        "TEXT": "",
        "HEX": "",
      },
      sendRecord:{},
      inputType: localStorage.txInputType || 'TEXT', //  默认Text（16进制和文字同时显示） ，16进制是HEX
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
    }
  },
  mounted() {
    uartServer.bindValWithObj(this, "uartStatus", "updateUartStatus");
    if(localStorage.txInputData || null) {
      this.inputData = localStorage.txInputData;
    }
    if(sessionStorage.txRecord != null) {
      this.sendRecord = JSON.parse(sessionStorage.txRecord);
    }
  },
  methods: {
    inpuDataChange(e) {
      if (this.inputType == 'HEX') {
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
      localStorage.txInputData = this.inputData ;
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
    // 发送数据
    sendData() {
      if(!this.inputData) {
        Notify({ type: "warning", message: "不能发送空字符串" });
        return;
      }
      else if(this.inputType == 'HEX' && this.inputData.length%2 != 0){
        Notify({ type: "warning", message: "请输入正确的16进制数据" });
        return;
      }
      uartServer.API.tranTXData({dataType:this.inputType,data:this.inputData});
      this._updateSendMessage(this.inputType, this.inputData);
    },
    resendData(data){
      const arrTmp = data.split('|');
      const inputType = arrTmp[0];
      const inputData = arrTmp[1];
      uartServer.API.tranTXData({dataType:inputType,data:inputData});
      this._updateSendMessage(inputType, inputData);
    },
    reinputData(data){
      const arrTmp = data.split('|');
      this.inputType = arrTmp[0];
      this.inputData = arrTmp[1];
    },
    delRecord(data){
      delete this.sendRecord[data];
      sessionStorage.txRecord = JSON.stringify(this.sendRecord);
    },
    _updateSendMessage(inputType,inputData) {
      const key = inputType+'|'+inputData;
      const times = this.sendRecord[key]||0;
      this.sendRecord[key]=times+1;
      sessionStorage.txRecord = JSON.stringify(this.sendRecord);
    }
  },
};
