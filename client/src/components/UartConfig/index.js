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
      showDialog: true,
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
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
  mounted() {},
  methods: {},
};
