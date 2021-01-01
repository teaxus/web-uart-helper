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
    };
  },
  computed: {},
  watch: {
    rxData:function(newVal){
      this.upRxData();
    }
  },
  mounted() {
    let _this = this;
    this.headRow = makeArry(1, this.rowSize); //  创建头部
    // this.rxData = this.test_str;

    uartServer.API.getRxRecord();
    uartServer.bindValWithObj(this,"rxData","rxRecord")
    uartServer.addCallbackWithAct("rxData", function(data) {
      _this.rxData += data.rxData;
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
    },
  },
};
