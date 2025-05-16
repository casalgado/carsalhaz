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
      path: "/recetas",
      name: "recetas",
      component: () => import("../views/AnthologyListView.vue"),
    },
    {
      path: "/lista",
      name: "lista",
      component: () => import("../views/BigShopingListView.vue"),
    },
    {
      path: "/lvyp",
      name: "lvyp",
      component: () => import("../views/AnthologyListView.vue"),
    },
    {
      path: "/bitac/new",
      name: "bitac",
      component: () => import("../views/BitacView.vue"),
    },
    {
      path: "/bitac",
      name: "bitac-old",
      component: () => import("../views/BitacViewBackup.vue"),
    },
    {
      path: "/portafolio",
      name: "portafolio",
      component: () => import("../views/PortfolioView.vue"),
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
