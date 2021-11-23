import { makeArry, arrTrans } from "@/Tools/arrayTools.js";
import uartServer from "@/Tools/uartServer.js";

export default {
  name: "TXPanel",
  data() {
    return {
      bufferData: null,
      rxData: "",
      rxDataArr: [],
      headRow: [],
      showDataArrs: [],
      rowSize: 0x1a, //  每一行的大小
      showType: parseInt(localStorage.rxShowType || 1), //  默认1（16进制和文字同时显示），3单纯显示文字
      hexTypeShowText: localStorage.hexTypeShowText != "false", // hex模式展示辅助文字
      reflashNewRx: true, //  标记是否刷新数据
    };
  },
  computed: {
    showTextOnly() {
      let returnData = [];
      this.rxDataArr.forEach(item => {
        returnData.push(String.fromCharCode(item));
      })
      return returnData.join("");
    }
  },
  watch: {
    rxData: function() {
      let arrTmp = this.rxData.split(" ");
      arrTmp.pop();
      this.rxDataArr = arrTmp;
      this.upRxData();
    },
    showType: function(newVal) {
      localStorage.rxShowType = newVal;
    },
  },
  mounted() {
    let _this = this;
    this.headRow = makeArry(1, this.rowSize); //  创建头部
    uartServer.API.getRxRecord();
    uartServer.bindValWithObj(this, "rxData", "rxRecord");
    uartServer.addCallbackWithAct("rxData", function(code, data) {
      if (_this.reflashNewRx) {
        _this.rxData += data.rxData;
      }
    });
  },
  methods: {
    // 在前面增加数字填充
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    // 处理接受的数据
    upRxData() {
      // 对数据进行处理
      let rxTmp = this.rxDataArr.concat([]);
      rxTmp.forEach((number, index) =>{
        const intNumber = parseInt(number);
        rxTmp[index] = intNumber;
      });
      // 转换成每行展示的数据
      this.showDataArrs = arrTrans(this.rowSize, rxTmp);
      let last_arr = this.showDataArrs[this.showDataArrs.length - 1];
      let fill_count = this.rowSize - last_arr.length;
      if (fill_count > 0) {
        let fill_arr = makeArry(0, fill_count - 1, "");
        last_arr.push.apply(last_arr, fill_arr);
      }
      // 保持滑动到底部
      setTimeout(function() {
        document.getElementById("keepBottom").scrollIntoView();
      }, 1);
    },
    // 暂停更新数据
    pauseReflashNewRx() {
      this.reflashNewRx = !this.reflashNewRx;
    },
    // 清除接收缓存
    clearRxCache() {
      uartServer.API.clearRxCache();
      this.rxData = " ";
    },
    hexTypeShowTextChange() {
      localStorage.hexTypeShowText = this.hexTypeShowText;
    },
  },
};
