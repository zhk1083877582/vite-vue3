import { createRouter, createWebHistory } from "vue-router";
import { createAuthGuard } from "./guards/auth";
import errorRoutes from "./modules/error";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            redirect: "/login",
            component: () => import("@/views/main/index.vue"),
            children: [],
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login/index.vue"),
        },
        ...errorRoutes,
        {
            path: "/test1",
            name: "test1",
            component: () => import("@/views/content/test/test1/index.vue"),
        },
    ],
});

// 创建路由守卫
createAuthGuard(router);

export default router;
