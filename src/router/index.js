import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/phone_data",
      name: "phone_data",
      component: () => import("../views/PhoneData.vue"),
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("../views/AboutView.vue"),
    // },
    // {
    //   path: "/api",
    //   name: "api",
    //   component: () => import("../views/ApiView.vue"),
    // },
    // {
    //   path: "/contact",
    //   name: "contact",
    //   component: () => import("../views/ContactView.vue"),
    // },
  ],
});

export default router;
