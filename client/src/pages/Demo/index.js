import { Notify } from "vant";
import uartServer from "@/Tools/uartServer.js";

export default {
  name: "MainPage",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    workInCWModeAction() {
      uartServer.API.tranTXData({
        dataType: "HEX",
        data: "11 0C C1 01 01 03 E8 3E 80 00 D8 76".replaceAll(" ", ""),
      });
    },
    workInCWModeSlowAction() {
      uartServer.API.tranTXData({
        dataType: "HEX",
        data: "11 0C C1 01 01 00 64 13 88 00 21 2F".replaceAll(" ", ""),
      });
    },
    workInCCWModeAction() {
      uartServer.API.tranTXData({
        dataType: "HEX",
        data: "11 0C C1 01 00 03 E8 3E 80 00 D9 A7".replaceAll(" ", ""),
      });
    },
    workInCCWModeSlowAction() {
      uartServer.API.tranTXData({
        dataType: "HEX",
        data: "11 0C C1 01 00 00 64 13 88 00 20 FE".replaceAll(" ", ""),
      });
    },
    stopAction() {
      uartServer.API.tranTXData({
        dataType: "HEX",
        data: "11 0C C1 00 00 00 00 13 88 00 2F 0E".replaceAll(" ", ""),
      });
    },
  },
};
