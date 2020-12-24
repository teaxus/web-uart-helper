import UartConfig from "@/components/UartConfig/index.vue";
import SideBar from "@/components/SideBarMenu/index.vue";
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "MainPage",
  props: {},
  components: {
    ParticlesBg,
    "side-bar": SideBar,
    "uart-config": UartConfig,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  mounted() {},
  methods: {
    barMiniChange(isOpen) {
        console.log("🚀 ~ file: index.js ~ line 21 ~ barMiniChange ~ isOpen", isOpen)
    },
    uartControl(openCMD) {
        console.log("🚀 ~ file: index.js ~ line 24 ~ uartControl ~ uartControl", openCMD)
    },
    TxPanelChange(isOpen) {
        console.log("🚀 ~ file: index.js ~ line 27 ~ TxPanelChange ~ isOpen", isOpen)
    },
    RxPanelChange(isOpen) {
        console.log("🚀 ~ file: index.js ~ line 30 ~ RxPanelChange ~ isOpen", isOpen)
    }
  },
};
