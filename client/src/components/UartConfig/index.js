import uartServer from "@/Tools/uartServer.js";

export default {
  name: "UartConfig",
  model: { prop: "show", event: "change" },
  props: {
    show: Boolean,
    serialPortConnectConfig: Object,
  },
  data() {
    return {
      popupShow: false,
      showDialog: false,
      selectType: null,
      selectTitle: null,
      selectData: [],
      arrSerialPort: [],
    };
  },
  computed: {},
  watch: {
    popupShow(value) {
      this.$emit("change", value);
    },
    show(val) {
      this.popupShow = val;
    },
  },
  mounted() {
    uartServer.bindValWithObj(this, "arrSerialPort", "updateDriveList");
  },
  methods: {
    async startSelectData(type) {
      this.showDialog = true;
      this.selectType = type;
      switch (type) {
        case "port":
          this.selectTitle = "选择端口";
          uartServer.API.getPort();
          setTimeout(()=>{
            this.selectData = this.arrSerialPort.filter(item => {return item.productId != null}).map(item => {return item.path});
            console.log(this.arrSerialPort);
          },100)
        break;
        case "baudRate":
          this.selectTitle = "选择波特率";
          this.selectData = [
            "1200",
            "2400",
            "4800",
            "9600",
            "19200",
            "38400",
            "57600",
          ];
          break;
        case "parity": // 校验位
          this.selectTitle = "选择校验位";
          this.selectData = ["none", "odd", "even", "mark", "space"];
        case "dataBits": // 数据位
          this.selectTitle = "选择数据位";
          this.selectData = ["8", "7", "6", "5"];
          break;
        case "stopBits": // 停止位
          this.selectTitle = "选择停止位";
          this.selectData = ["1", "1.5", "2"];
          break;
      }
    },
    didSelect(isConfirm) {
      if (isConfirm) {
        let select_val = this.$refs.DataSelectPicker.getValues()[0];
        switch (this.selectType) {
          case "port":
            this.serialPortConnectConfig.connectPortName = select_val;
            break;
          case "baudRate": // 波特率
            this.serialPortConnectConfig.baudRate = select_val;
            break;
          case "parity": // 校验位
            this.serialPortConnectConfig.parity = select_val;
            break;
          case "dataBits": // 数据位
            this.serialPortConnectConfig.dataBits = select_val;
            break;
          case "stopBits": // 停止位
            this.serialPortConnectConfig.stopBits = select_val;
            break;
        }
      }
      this.selectType = null;
      this.selectTitle = null;
      this.selectData = [];
    },
  },
};
