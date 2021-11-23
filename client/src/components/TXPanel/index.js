import { Notify } from "vant";
import uartServer from "@/Tools/uartServer.js";

export default {
  name: "TXPanel",
  data() {
    return {
      dictTrueData: {
        // 真正的数据
        "TEXT": "",
        "HEX": "",
      },
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
    if(localStorage.txInputData || null) {
      this.inputData = localStorage.txInputData;
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
    checkTxRecord() {},
    clearTxCache() {},
    // 发送数据
    sendData() {
      if(!this.inputData) {
        Notify({ type: "warning", message: "不能发送空字符串" });
        return;
      }
      else if(this.inputData.length%2 != 0){
        Notify({ type: "warning", message: "请输入正确的16进制数据" });
        return;
      }
      uartServer.API.tranTXData({dataType:this.inputType,data:this.inputData});
      console.log(this.inputData);
    },
  },
};
