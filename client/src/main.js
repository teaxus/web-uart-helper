import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSidebarMenu from "vue-sidebar-menu";
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vant);
Vue.use(VueRouter);
Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
