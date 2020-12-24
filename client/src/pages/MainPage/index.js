
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
      uart_is_opened: false,
      min_silder_bar: true,
      menu: [
        {
          header: true,
          title: "Usart Helper",
          hiddenOnCollapse: true,
        },
        {
          slotName: "opencontrol",
        },
        {
          slotName: "config",
        },
        {
          slotName: "sendControl",
        },
        {
          slotName: "receiverControl",
        },
      ],
    };
  },
  mounted() {
      
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.min_silder_bar = collapsed;
    },
  },
};
