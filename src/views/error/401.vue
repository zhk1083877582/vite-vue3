<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-image">
        <Icon type="ios-lock" size="128" />
      </div>
      <h1>401</h1>
      <h2>抱歉，您未登录或登录已过期</h2>
      <p>请重新登录后继续访问</p>
      <el-button type="primary" size="large" @click="handleLogin">
        返回登录
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogin = () => {
  router.replace("/login");
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
      color: #2d8cf0;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 72px;
      font-weight: 600;
      color: #2d8cf0;
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
