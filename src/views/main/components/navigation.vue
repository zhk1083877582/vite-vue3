<!--  -->
<template>
    <div class="navigation">
        <img src="@/assets/images/logo.png" @click="logout" />
        <topMenu />
        <info />
    </div>
</template>

<script setup>
import topMenu from "./menu.vue";
import info from "./info.vue";
import { ref, onMounted } from "vue";
import dt from "@/config/dt";
import router from "@/router";
const logout = () => {
    dt.session.remove("dt-auth");
    router.replace("/login");
};
</script>

<style lang="scss" scoped>
.navigation {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
</style>
