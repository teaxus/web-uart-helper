import { makeArry, arrTrans } from "@/Tools/arrayTools.js";

export default {
  name: "TXPanel",
  data() {
    return {
      bufferData: null,
      test_str:
        "kdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdfkdjlskdjflksdjflsdf",
      headRow: [],
      showDataArrs: [],
      rowSize: 0x1D, //  每一行的大小
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.showDataArrs = arrTrans(this.rowSize, this.test_str.split(""));
    this.headRow = makeArry(1, this.rowSize);
    // debugger;
  },
  methods: {
    prefixZero(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
  },
};
