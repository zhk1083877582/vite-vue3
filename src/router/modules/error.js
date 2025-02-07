export default [
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error/401.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/error/404.vue"),
  },
];
