import { Notify } from "vant";

export default {
  name: "Studio",
  components: {},
  props: {
    height: {
      type: Number,
    },
  },
  data() {
    return {
      arrByteItem: [],

      // 一个item包含的变量
      radio: null,
      value: null,
      openCalSettingMode: false,
      selectCalByte: [],
      calRadio: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    addOneByteItemAction() {
      this.arrByteItem.push({
        index: this.arrByteItem.length,
      });
    },

    // 单个Byte设置的Item方法 ------- Begin
    openCalSettingModeAction() {
      this.openCalSettingMode = true;
    },
    cleanCalSelectBytes() {
      this.selectCalByte = [];
    },
    // 单个Byte设置的Item方法 ------- End
  },
};
