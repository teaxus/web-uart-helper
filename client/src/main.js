import Vue from "vue";
import VConsole from "vconsole";
import VueRouter from "vue-router";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import "@/assets/css/font-awesome/css/font-awesome.min.css";
import * as VueWindow from "@hscmap/vue-window";
import uartServer from "@/Tools/uartServer.js";

Vue.use(Vant);
Vue.use(VueRouter);
Vue.use(VueWindow);
Vue.config.productionTip = false;

if (process.env.BUILD_ENV !== "production") {
  // eslint-disable-next-line no-new
  new VConsole();
}
// uartServer.startup("localhost:8181");
uartServer.startup("192.168.100.125:8181");
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
