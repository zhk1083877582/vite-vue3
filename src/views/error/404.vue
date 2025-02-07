<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-image">
        <Icon type="ios-help-circle" size="128" />
      </div>
      <h1>404</h1>
      <h2>抱歉，您访问的页面不存在</h2>
      <p>请检查输入的网址是否正确</p>
      <el-button type="primary" size="large" @click="handleBack">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import dt from "@/config/dt";
import { getFirstAvailableRoute } from "@/router/utils";

const router = useRouter();

const handleBack = async () => {
  // 检查是否已登录
  const isAuthenticated = dt.session.get("dt_auth");
  if (!isAuthenticated) {
    router.push("/login");
    return;
  }

  // 获取第一个可用路由并跳转
  const firstRoute = await getFirstAvailableRoute(router);
  if (firstRoute) {
    router.push({ name: firstRoute.name });
  } else {
    router.push("/");
  }
};
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f8f9;

  .error-content {
    text-align: center;
    padding: 48px;

    .error-image {
      color: #515a6e;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 72px;
      font-weight: 600;
      color: #515a6e;
      margin: 0;
      line-height: 1;
    }

    h2 {
      font-size: 24px;
      color: #515a6e;
      margin: 24px 0 16px;
      font-weight: normal;
    }

    p {
      font-size: 16px;
      color: #808695;
      margin-bottom: 32px;
    }
  }
}
</style>
