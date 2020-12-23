import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from "./router";
import '@/assets/css/font-awesome/css/font-awesome.min.css'

Vue.use(Vant);
Vue.use(VueRouter);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
