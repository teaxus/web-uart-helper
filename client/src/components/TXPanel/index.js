import { Notify } from "vant";

export default {
  name: "TXPanel",
  data() {
    return {
      dictTrueData: {
        // 真正的数据
        "1": "",
        "3": "",
      },
      inputType: 3, //  默认1（16进制和文字同时显示），3单纯显示文字
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
  watch: {},
  mounted() {},
  methods: {
    inpuDataChange(e) {
      if (this.inputType == 1) {
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
    checkTxRecord() {},
    clearTxCache() {},
    // 发送数据
    sendData() {},
  },
};
