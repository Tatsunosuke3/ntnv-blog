import Vue from "vue";
import VueRouter, { RouterOptions, RouteConfig, Route } from "vue-router";
import Home from "@/views/Home.vue";
import Tags from "@/views/Tags.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/tags/:keywords",
    name: "tags",
    component: Tags
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to: Route, from: Route, savedPosition: any) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
