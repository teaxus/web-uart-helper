import { makeArry, arrTrans } from "@/Tools/arrayTools.js";
import uartServer from "@/Tools/uartServer.js";

export default {
  name: "TXPanel",
  data() {
    return {
      bufferData: null,
      rxData: "",
      headRow: [],
      showDataArrs: [],
      rowSize: 0x1a, //  每一行的大小
      showType: 1, //  默认1（16进制和文字同时显示），2单纯显示16进制数据，3单纯显示文字
      reflashNewRx: true  //  标记是否刷新数据
    };
  },
  computed: {},
  watch: {
    rxData: function(newVal) {
      this.upRxData();
    },
  },
  mounted() {
    let _this = this;
    this.headRow = makeArry(1, this.rowSize); //  创建头部

    uartServer.API.getRxRecord();
    uartServer.bindValWithObj(this, "rxData", "rxRecord");
    uartServer.addCallbackWithAct("rxData", function(code, data) {
      if(_this.reflashNewRx){
        _this.rxData += data.rxData;
      }
    });
  },
  methods: {
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    upRxData() {
      this.showDataArrs = arrTrans(this.rowSize, this.rxData.split(""));
      let last_arr = this.showDataArrs[this.showDataArrs.length - 1];
      let fill_count = this.rowSize - last_arr.length;
      if (fill_count > 0) {
        let fill_arr = makeArry(0, fill_count - 1, "");
        last_arr.push.apply(last_arr, fill_arr);
      }
      setTimeout(function(){
        document.getElementById("keepBottom").scrollIntoView(); // 保持滑动到底部
      },1);
    },
    // 暂停更新数据
    pauseReflashNewRx() {
      this.reflashNewRx = !this.reflashNewRx;
    },
    // 清除接收缓存
    clearRxCache() {},
  },
};
