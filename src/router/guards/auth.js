import dt from "@/config/dt";
import { initDynamicRoutes, getFirstAvailableRoute } from "../utils";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入
NProgress.configure({
  // 动画方式
  easing: "ease",
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3,
});

// 标记路由是否已经初始化
let routesInitialized = false;
let dynamicRoutes = []; // 保存动态路由配置

export function createAuthGuard(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // 检查用户是否已登录
    const isAuthenticated = dt.session.get("dt_auth");
    // console.log("Authentication status:", isAuthenticated);

    // 错误页面直接放行
    if (["401", "403", "404"].includes(to.name)) {
      next();
      return;
    }

    // 如果访问登录页面且已登录
    if (to.name === "login" && isAuthenticated) {
      // 确保动态路由已初始化
      if (!routesInitialized) {
        await initDynamicRoutes(router);
        routesInitialized = true;
      }
      // 获取第一个可用路由并跳转
      const firstRoute = await getFirstAvailableRoute(router);
      if (firstRoute) {
        next({ name: firstRoute.name });
      } else {
        next("/");
      }
      return;
    }

    // 如果访问登录页面且未登录
    if (to.name === "login" && !isAuthenticated) {
      dt.session.clear();
      routesInitialized = false;
      dynamicRoutes.forEach((route) => {
        router.removeRoute(route.name);
      });
      dynamicRoutes = [];
      next();
      return;
    }

    // 如果用户未登录
    if (!isAuthenticated) {
      next("/401");
      return;
    }

    try {
      // 初始化动态路由（如果未初始化）
      if (!routesInitialized) {
        const routes = await initDynamicRoutes(router);
        dynamicRoutes = routes;
        routesInitialized = true;

        // 重新导航到目标路由
        next({ ...to, replace: true });
        return;
      }

      // 如果访问根路径，重定向到第一个子路由
      if (to.path === "/") {
        const firstRoute = await getFirstAvailableRoute(router);
        if (firstRoute) {
          next({ name: firstRoute.name });
          return;
        }
      }

      // 检查路由是否存在
      const routeExists =
        router.hasRoute(to.name) ||
        dynamicRoutes.some((route) => route.path === to.path) ||
        ["/", "/login", "/401", "/403", "/404"].includes(to.path);

      if (!routeExists) {
        next("/404");
        return;
      }

      // 检查用户权限
      const hasPermission = await checkPermission(to);
      if (!hasPermission) {
        next("/403");
        return;
      }

      next();
    } catch (error) {
      next("/404");
    }
  });

  router.afterEach(() => {
    // dt.ui.LoadingBar.finish();
    NProgress.done();
  });
}

async function checkPermission(route) {
  // 实现权限检查逻辑
  return true;
}
