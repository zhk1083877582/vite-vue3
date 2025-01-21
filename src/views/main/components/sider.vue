<script setup>
import router from "@/router";
import { ref, watch } from "vue";
import menus from "./menus.vue";
const menuHeight = ref(window.innerHeight);
</script>
<template>
    <div
        style="
            overflow-y: auto;
            overflow-x: hidden;
            background: #1a202e;
            min-width: 200px;
        "
        :style="{ maxHeight: menuHeight + 'px' }"
    >
        <menus />
    </div>
</template>

<style scoped lang="scss">
@import url("@/assets/css/sider.scss");
</style>
