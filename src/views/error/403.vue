<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-image">
        <Icon type="ios-warning" size="128" />
      </div>
      <h1>403</h1>
      <h2>抱歉，您无权访问该页面</h2>
      <p>请联系管理员获取相应权限</p>
      <el-button type="primary" size="large" @click="handleBack">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleBack = () => {
  router.push("/");
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
      color: #ed4014;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 72px;
      font-weight: 600;
      color: #ed4014;
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
