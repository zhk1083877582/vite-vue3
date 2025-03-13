<template>
	<div class="navigation">
		<div v-show="settingStore().menuType == 'LEFT'">
			<div class="menu-collapse" style="text-align: center; padding-top: 5px; cursor: pointer">
				<el-icon @click="showMenu" v-show="menuStore().menuIsCollapse" :size="25" color="var(--el-color-primary-light-3)">
					<!-- #78829d -->
					<Expand />
				</el-icon>
				<el-icon @click="showMenu" v-show="!menuStore().menuIsCollapse" :size="25" color="var(--el-color-primary-light-3)">
					<Fold />
				</el-icon>
			</div>
		</div>
		<div v-show="settingStore().menuType == 'TOP'" style="display: flex">
			<img src="@/assets/images/IsoftstoneLogo_2.png" style="max-height: 27px; margin: 8px 15px 0 0" />
			<topMenu />
		</div>
		<info />
	</div>
	<!-- 面包屑 -->
	<breadcrumb />
</template>

<script setup>
	import topMenu from "./topMenu.vue";
	import info from "./info.vue";
	import { menuStore } from "@/store/menu";
	import { settingStore } from "@/store/setting";
	import Breadcrumb from "./Breadcrumb/index.vue";

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
