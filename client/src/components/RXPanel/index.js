import { makeArry, arrTrans } from "@/Tools/arrayTools.js";

export default {
  name: "TXPanel",
  data() {
    return {
      bufferData: null,
      test_str:
        'import.{.makeArry,.arrTrans.}.from."@/Tools/arradjflksdjflsskdjflksdjflsdfflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdf',
      headRow: [],
      showDataArrs: [],
      rowSize: 0x0f, //  每一行的大小
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.showDataArrs = arrTrans(this.rowSize, this.test_str.split(""));
    let last_arr = this.showDataArrs[this.showDataArrs.length - 1];
    let fill_count = this.rowSize - last_arr.length;
    if (fill_count > 0) {
      let fill_arr = makeArry(0, fill_count - 1, "");
      last_arr.push.apply(last_arr, fill_arr);
    }

    this.headRow = makeArry(1, this.rowSize);
  },
  methods: {
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
  },
};
