import { ref } from "vue";
import { useRouter } from "vue-router";
import dt from "@/config/dt";
import { initDynamicRoutes, getFirstAvailableRoute } from "@/router/utils";
import server from "@/config/server";
let api = {
  roles: () => {
    return server.api().post('/hft-portal/v1/user/noToken/roles/byPhone').auth(false).config(true)
  },
  imgCode: () => {
    return server.api().post('/hft-portal/noToken/getImgCode').auth(false).config(true)
  },
  code: () => {
    return server.api().post('/hft-portal/noToken/sendMessage').auth(false).config(false)
  },
  login: () => {
    return server
      .api()
      .post('/hft-sc-oauth2/oauth/token?grant_type=password&client_id=hft')
      .auth(false)
      .config(true)
  },
  info: () => {
    return server.api().post('/hft-portal/web/getOauthInfo')
  }
}
console.log("🚀 ~ useAuth.js:73 ~ login ~ api:", server.config)

export function useAuth() {
  const router = useRouter();
  const loading = ref(false);

  const login = async (credentials) => {
    try {
      loading.value = true;
      dt.session.set("dt_auth", { userName: "admin", Password: "111" });
      dt.ui.Message.success("登录成功");
      // server.config(true);
      // 初始化动态路由并跳转到第一个可用路由
      await initDynamicRoutes(router);
      const firstRoute = await getFirstAvailableRoute(router);
      if (firstRoute) {
        router.push({ name: firstRoute.name });
      } else {
        router.push("/");
      }
      return true;
      // const res = await dt.server.post("/login", credentials);
      // if (res.code === 200) {
      //     dt.session.set("dt_auth", res.data.token);
      //     dt.ui.Message.success("登录成功");

      //     // 初始化动态路由并跳转到第一个可用路由
      //     await initDynamicRoutes(router);
      //     const firstRoute = await getFirstAvailableRoute(router);
      //     if (firstRoute) {
      //         router.push({ name: firstRoute.name });
      //     } else {
      //         router.push("/");
      //     }
      //     return true;
      // }
      dt.ui.Message.error(res.msg || "登录失败");
      ElMessage.error(res.msg || "登录失败");
      return false;
    } catch (error) {
      dt.ui.Message.error("登录失败，请稍后重试");
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    dt.session.clear();
    router.goLogin();
  };

  return {
    loading,
    login,
    logout,
  };
}
