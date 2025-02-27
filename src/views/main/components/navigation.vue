<template>
	<div class="navigation">
		<img src="@/assets/images/logo.png" />
		<topMenu v-show="userStore().menuType == 'top'" />
		<info />
	</div>
</template>

<script setup>
	import topMenu from "./topMenu.vue";
	import info from "./info.vue";
	import { userStore } from "@/store/user";
</script>

<style lang="scss" scoped>
	.navigation {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
	}
</style>
