<template>
	<div class="navigation">
		<div v-show="menuStore().menuType == 'left'">
			<div class="menu-collapse" style="text-align: center; padding-top: 5px; cursor: pointer">
				<el-icon @click="showMenu" v-show="menuStore().menuIsCollapse" :size="25" color="#1e65ff">
					<Expand />
				</el-icon>
				<el-icon @click="showMenu" v-show="!menuStore().menuIsCollapse" :size="25" color="#1e65ff">
					<Fold />
				</el-icon>
			</div>
		</div>
		<div v-show="menuStore().menuType == 'top'" style="display: flex">
			<img src="@/assets/images/IsoftstoneLogo_2.png" style="max-height: 27px; margin: 8px 15px 0 0" />
			<topMenu />
		</div>
		<info />
	</div>
</template>

<script setup>
	import topMenu from "./topMenu.vue";
	import info from "./info.vue";
	import { menuStore } from "@/store/menu";
	const showMenu = () => {
		menuStore().changeCollapse();
	};
</script>

<style lang="scss" scoped>
	.navigation {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		position: relative;
		padding-left: 30px;
		height: 46px;
		background: #f2f2f2;
	}
	.menu-collapse {
		position: absolute;
		left: -2px;
		top: 5px;
	}
</style>
