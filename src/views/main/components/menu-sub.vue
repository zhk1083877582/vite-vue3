<script setup>
// import
import { extractPath } from "@/router/utils";
const props = defineProps({
    item: Object,
});
</script>

<template>
    <Submenu v-if="item.child?.length" :name="item.cOpCnm">
        <template #title>
            <span :class="[item.cOpImg, 'iconfont', 'menu-icon']"></span>
            <span>{{ item.cOpCnm }}</span>
        </template>
        <menu-sub v-for="i in item.child" :key="i.name" :item="i" />
    </Submenu>
    <MenuItem v-else :name="extractPath(item.cOpAct)">
        <span :class="[item.cOpImg, 'iconfont', 'menu-icon']"></span>
        <span>{{ item.cOpCnm }}</span>
    </MenuItem>
</template>

<style scoped lang="scss">
@import url("@/assets/css/sider.scss");
</style>
