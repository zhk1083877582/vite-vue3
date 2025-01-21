<template>
  <!-- <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 20px; position: absolute; top: 0; left: 300px"
    >
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
    </el-radio-group> -->

  <el-menu
    active-text-color="#ffd04b"
    background-color="#1a202e"
    text-color="#fff"
    :default-active="current"
    :default-openeds="opens"
    :unique-opened="true"
    class="el-menu-vertical-demo"
    popper-class="custom-menu-popper"
    :style="{
      maxWidth: '200px',
      overflowY: 'auto',
      minHeight: menuHeight + 'px',
      paddingBottom: '70px'
    }"
    :collapse="isCollapse">
    <div style="text-align: center; padding-top: 5px; cursor: pointer">
      <el-icon @click="showMenu" v-show="isCollapse" :size="20" color="#409efc"><Expand /></el-icon>
      <el-icon @click="showMenu" v-show="!isCollapse" :size="20" color="#409efc"><Fold /></el-icon>
    </div>
    <el-menu-sub v-for="i in menuItems" :key="i.name" :item="i" />
  </el-menu>
</template>

<script setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  import { Expand, Fold } from '@element-plus/icons-vue'
  import { ElMenu } from 'element-plus'
  import 'element-plus/dist/index.css'
  import elMenuSub from './el-menu-sub.vue'
  import { useRouter } from 'vue-router'
  import routerJson from '@/router/routerJson'
  const isCollapse = ref(false)
  const menuHeight = ref(window.innerHeight)

  const router = useRouter()

  const menuItems = ref([])
  let [current, opens] = [ref(), ref()]
  const menuRef = ref()
  onMounted(async () => {
    const response = await routerJson.routerList()
    if (response.code === 200) {
      menuItems.value = response.data.child // 假设菜单数据在 `child` 属性中
    }
  })

  watch(
    () => router.currentRoute.value,
    (route) => {
      current.value = route.meta.menuName || route.meta.name
      opens.value = route.meta.cOpRoot.split('/')
      nextTick(() => {
        nextTick(() => {
          // menuRef.value.updateOpened();
          // menuRef.value.updateActiveName();
        })
      })
    },
    { immediate: true }
  )
  const showMenu = () => {
    isCollapse.value = !isCollapse.value
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .custom-menu-popper {
    max-height: 400px; /* 设置最大高度 */
    overflow-y: auto; /* 添加垂直滚动条 */
  }
</style>
