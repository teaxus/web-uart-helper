import UartConfig from "@/components/UartConfig/index.vue";
import SideBar from "@/components/SideBarMenu/index.vue";
import TXPanel from "@/components/TXPanel/index.vue";
import RXPanel from "@/components/RXPanel/index.vue";
import { ParticlesBg } from "particles-bg-vue";
import uartServer from "@/Tools/uartServer.js";
import { Notify } from 'vant';
import * as VueWindow from '@hscmap/vue-window'

export default {
  name: "MainPage",
  props: {},
  components: {
    ParticlesBg,
    "tx-planel": TXPanel,
    "rx-planel": RXPanel,
    "side-bar": SideBar,
    "uart-config": UartConfig,
  },
  data() {
    return {
      StyleWhite:VueWindow.StyleWhite,
      showSerialPortConnectConfig: false, // 串口配置弹窗
      sideBarStatus: {
        open_tx_panel: localStorage["open_tx_panel"] != "false",
        open_rx_panel: localStorage["open_rx_panel"] != "false",
        min_silder_bar: localStorage["min_silder_bar"] == "true",
      },
      serialPortConnectConfig: {
        //串口链接配置
        connectPortName: "", //连接端口的名称
        baudRate: 9600, //波特率
        parity: "none", //奇偶校验
        dataBits: 8, //数据位
        stopBits: 1, //停止位
        flowControl: false,
      },
      defaultWindowInfo: {
        left: 0,
        top: 0,
        width: 1000,
        height: 180,
      },
      rxWindowInfo: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      txWindowInfo: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
    };
  },
  computed: {
    windowsLeftOffset() {
      //窗口偏移
      return this.sideBarStatus.min_silder_bar ? 60 : 236;
    },
  },
  watch: {
    rxWindowInfo: {
      handler: function(val) {
        localStorage["rxWindowInfo"] = JSON.stringify(val);
      },
      deep: true,
    },
    txWindowInfo: {
      handler: function(val) {
        localStorage["txWindowInfo"] = JSON.stringify(val);
      },
      deep: true,
    },
    serialPortConnectConfig: {
      handler: function(val) {
        localStorage["serialPortConnectConfig"] = JSON.stringify(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.initWindows();
    this.initSerialPortConnectConfig();

    uartServer.addCallbackWithAct("showError", function(code, data) {
      if(code != 0){
        Notify({ type: 'warning', message: data.showMsg });
      }
    });
  },
  methods: {
    initWindows() {
      this.defaultWindowInfo.width = window.innerWidth - this.windowsLeftOffset;
      this.defaultWindowInfo.height = window.innerHeight / 2 - 10;
      if (localStorage["rxWindowInfo"] == null) {
        this.rxWindowInfo.left = this.windowsLeftOffset;
        this.rxWindowInfo.top = 0;
        this.rxWindowInfo.width = this.defaultWindowInfo.width;
        this.rxWindowInfo.height = this.defaultWindowInfo.height;
      } else {
        let dictRxWindowInfo = JSON.parse(localStorage["rxWindowInfo"]);
        this.rxWindowInfo.left =
          dictRxWindowInfo.left || this.windowsLeftOffset;
        this.rxWindowInfo.top = dictRxWindowInfo.top;
        this.rxWindowInfo.width = dictRxWindowInfo.width;
        this.rxWindowInfo.height = dictRxWindowInfo.height;
      }
      if (localStorage["txWindowInfo"] == null) {
        this.txWindowInfo.left = this.windowsLeftOffset;
        this.txWindowInfo.top =
          this.rxWindowInfo.top + this.rxWindowInfo.height + 40;
        this.txWindowInfo.width = this.defaultWindowInfo.width;
        this.txWindowInfo.height = this.defaultWindowInfo.height;
      } else {
        let dictTxWindowInfo = JSON.parse(localStorage["txWindowInfo"]);
        this.txWindowInfo.left =
          dictTxWindowInfo.left || this.windowsLeftOffset;
        this.txWindowInfo.top = dictTxWindowInfo.top;
        this.txWindowInfo.width = dictTxWindowInfo.width;
        this.txWindowInfo.height = dictTxWindowInfo.height;
      }
    },
    initSerialPortConnectConfig() {
      let serialPortConnectConfig = localStorage["serialPortConnectConfig"];
      if (serialPortConnectConfig != null) {
        this.serialPortConnectConfig = JSON.parse(serialPortConnectConfig);
      }
    },
    barMiniChange(isMinifyed) {
      if (isMinifyed) {
        this.rxWindowInfo.width += 176;
        this.txWindowInfo.width += 176;
      } else {
        this.rxWindowInfo.width -= 176;
        this.txWindowInfo.width -= 176;
      }
      let _this = this;
      setTimeout(function() {
        _this.rxWindowInfo.left = _this.windowsLeftOffset;
        _this.txWindowInfo.left = _this.windowsLeftOffset;
      }, 1);
      console.log(
        "🚀 ~ file: index.js ~ line 91 ~ barMiniChange ~ isMinifyed",
        isMinifyed
      );
    },

    uartControl(openCMD) {
      if (openCMD) {
        if(this.serialPortConnectConfig.connectPortName == '') {
          Notify({ type: "warning", message: "没有选择端口" });
          this.showSerialPortConnectConfig = true;
          return
        }
        uartServer.API.openPort(this.serialPortConnectConfig);
      } else {
        uartServer.API.shutdownUart();
      }
      console.log(
        "🚀 ~ file: index.js ~ line 24 ~ uartControl ~ uartControl",
        openCMD
      );
    },
    TxPanelChange(isOpen) {
      this.sideBarStatus.open_tx_panel = isOpen;
      console.log(
        "🚀 ~ file: index.js ~ line 27 ~ TxPanelChange ~ isOpen",
        isOpen
      );
    },
    RxPanelChange(isOpen) {
      this.sideBarStatus.open_rx_panel = isOpen;
      console.log(
        "🚀 ~ file: index.js ~ line 30 ~ RxPanelChange ~ isOpen",
        isOpen
      );
    },
  },
};
