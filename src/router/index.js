import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenView from "../views/MenView.vue";
import WomenView from "../views/WomenView.vue";
import OtherView from "../views/OtherView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/MenView",
    name: "MenView",
    component: MenView,
  },
  {
    path: "/WomenView",
    name: "WomenView",
    component: WomenView,
  },
  {
    path: "/OtherView",
    name: "OtherView",
    component: OtherView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
