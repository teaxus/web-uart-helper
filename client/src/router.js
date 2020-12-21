import VueRouter from "vue-router";

const MainPage = () => import("@/pages/MainPage/index.vue");

const router = new VueRouter({
  mode: "hash", //history  hash
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage,
    },
  ],
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
