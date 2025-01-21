<script setup>
  import { ref, onMounted, watch, nextTick } from 'vue'
  import menuSub from './menu-sub.vue'
  import { useRouter } from 'vue-router'
  import routerJson from '@/router/routerJson'
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
          menuRef.value.updateOpened()
          menuRef.value.updateActiveName()
        })
      })
    },
    { immediate: true }
  )

  function onClick(name) {
    if (name) router.push(name)
  }
</script>

<template>
  <div style="padding-bottom: 10px">
    <Menu
      ref="menuRef"
      theme="dark"
      accordion
      width="200px"
      @on-select="onClick"
      :active-name="current"
      :open-names="opens">
      <menu-sub v-for="i in menuItems" :key="i.name" :item="i" />
    </Menu>
  </div>
</template>

<style lang="scss" scoped>
  @import url('@/assets/css/sider.scss');
</style>
