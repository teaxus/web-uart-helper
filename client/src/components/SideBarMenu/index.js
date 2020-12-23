import echarts from "echarts";
import SideBarMenu from "./SidebarMenu.vue";
import SidebarMenuIcon from "./SidebarMenuIcon.vue";

export default {
  name: "SideBar",
  props: {},
  components: {
    SidebarMenuIcon,
    "sidebar-menu": SideBarMenu,
  },
  data() {
    return {
      uart_is_opened: false,
      min_silder_bar: false,
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
          // data:  [220, 232, 150, 80, 70, 110, 130, 200, 150, 80, 201, 234, 290, 230, 220],
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
          // data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110, 130],
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
    onToggleCollapse(collapsed) {
      this.min_silder_bar = collapsed;
    },
  }
};
