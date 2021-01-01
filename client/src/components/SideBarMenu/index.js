import echarts from "echarts";
import SideBarMenu from "./SidebarMenu.vue";
import SidebarMenuIcon from "./SidebarMenuIcon.vue";
import uartServer from '@/Tools/uartServer.js';

export default {
  name: "SideBar",
  props: {
    sideBarStatus:Object,
    serialPortConnectConfig: Object
  },
  components: {
    SidebarMenuIcon,
    "sidebar-menu": SideBarMenu,
  },
  data() {
    return {
      uart_is_opened: false,
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
          slotName: "receiverControl",
        },
        {
          slotName: "sendControl",
        },
      ],
    };
  },
  watch: {
    "sideBarStatus.min_silder_bar": {
      handler: function(val) {
        localStorage["min_silder_bar"] = val;
        this.$emit("barMiniChange", val);
        this.sideBarStatus.min_silder_bar = val;
      },
      immediate: true,
    },
    "sideBarStatus.open_tx_panel": {
      handler: function(val) {
        localStorage["open_tx_panel"] = val;
        this.$emit("TxPanelChange", val);
        this.sideBarStatus.txWindowIsOpen = val;
      },
      immediate: true,
    },
    "sideBarStatus.open_rx_panel": {
      handler: function(val) {
        localStorage["open_rx_panel"] = val;
        this.$emit("RxPanelChange", val);
      },
      immediate: true,
    },
  },
  mounted() {
    uartServer.bindValWithObj(this,"uart_is_opened","keepalive","state.serialOpened")
    this.chartLine = echarts.init(document.getElementById("chartLineBox"));

    // 指定图表的配置项和数据
    var option = {
      backgroundColor: "#000",
      legend: {
        //设置区分（哪条线属于什么）
        data: ["已发送", "已接收"],
        orient: "horizontal", // 'vertical'
        x: "right", // 'center' | 'left' | {number},
        y: "center", // 'center' | 'bottom' | {number}
        backgroundColor: "#fff",
      },
      color: ["#8AE09F", "#FA6F53"], //设置区分（每条线是什么颜色，和 legend 一一对应）
      xAxis: {
        //设置x轴
        type: "category",
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        show: false,
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        type: "value",
        show: false,
      },
      series: [
        {
          name: "已发送",
          data: [],
          type: "line", // 类型为折线图
          lineStyle: {
            // 线条样式 => 必须使用normal属性
            normal: {
              color: "#8AE09F",
            },
          },
        },
        {
          name: "已接收",
          data: [],
          type: "line",
          lineStyle: {
            normal: {
              color: "#FA6F53",
            },
          },
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    this.chartLine.setOption(option);

    setInterval(() => {
      if (this.uart_is_opened) {
        option.series[0].data.push(parseInt(Math.random() * 100));
        option.series[1].data.push(parseInt(Math.random() * 100));
        if (option.series[0].data.length > 20) {
          option.series[0].data.shift();
          option.series[1].data.shift();
        }
        this.chartLine.setOption(option);
      }
    }, 1000);
  },
  methods: {
    openUartStateDidChange(val){
      this.$emit("openControl", val);
    },
    onToggleCollapse(collapsed) {
      this.sideBarStatus.min_silder_bar = collapsed;
    },
    configSerialPortConnect(){
      this.$emit("configSerialPortConnect", true);
    }
  },
};
