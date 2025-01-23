<template>
    <div>
        <!-- <navigation /> -->
        <div
            style="background: white; margin-top: 10px; display: flex"
            :style="{
                height: contentHeight + 'px',
                width: contentWidth + 'px',
            }"
        >
            <!-- <sider /> -->
            <el-menu />
            <div
                style="padding: 10px; flex: 1"
                :style="{
                    height: contentHeight + 'px',
                    width: contentWidth - 200 + 'px',
                }"
            >
                <tabs />
                <div
                    class="contain"
                    :style="{
                        height: contentHeight - 114 + 'px',
                        overflowY: 'auto',
                    }"
                >
                    <RouterView v-slot="{ Component }">
                        <component
                            :is="Component"
                            v-if="!meta.keep"
                            :key="meta.name"
                        />
                        <KeepAlive>
                            <component
                                :is="Component"
                                v-if="meta.keep"
                                :key="meta.name"
                            />
                        </KeepAlive>
                    </RouterView>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import tabs from "./components/tabs.vue";
import elMenu from "./components/el-menu.vue";

import { ref, watch } from "vue";
import router from "@/router";
const contentHeight = ref(window.innerHeight);
const contentWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
    contentHeight.value = window.innerHeight;
    contentWidth.value = window.innerWidth;
});

const meta = ref();

watch(
    () => router.currentRoute.value,
    (route) => {
        meta.value = route.meta;
    },
    { immediate: true }
);
</script>
<style lang="scss" scoped>
@import url("@/assets/css/sider.scss");
.contain {
    padding: 10px;
}
</style>
