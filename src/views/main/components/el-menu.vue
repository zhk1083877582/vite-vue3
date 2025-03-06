<template>
	<el-menu
		active-text-color="#ffd04b"
		background-color="#1a202e"
		text-color="#fff"
		:default-active="current"
		:default-openeds="opens"
		:unique-opened="true"
		@select="onClick"
		:class="menuStore().menuIsCollapse ? '' : 'my-menu'"
		popper-class="custom-menu-popper"
		:style="{
			maxWidth: '200px',
			overflowY: 'auto',
			minHeight: menuHeight + 'px',
			paddingBottom: '70px'
		}"
		:collapse="menuStore().menuIsCollapse"
	>
		<el-menu-sub v-for="i in menuStore().items" :key="i.name" :item="i" />
	</el-menu>
</template>

<script setup>
	import { ElMenu } from "element-plus";
	import elMenuSub from "./el-menu-sub.vue";
	import { useRouter } from "vue-router";
	import { menuStore } from "@/store/menu";
	const menuHeight = ref(window.innerHeight);
	const router = useRouter();
	let [current, opens] = [ref(), ref()];
	function onClick(name) {
		if (name) router.push({ name });
	}
	onMounted(async () => {});
	function checkCurrent() {
		let menuDic = menuStore().dic;
		if (current.value && Object.keys(menuDic).length) {
			let item = menuDic[current.value];
			if (item) {
				if (item.type == "project" && !projectStore().info) {
					router.goRoot();
					menuStore().choiceRoot();
				} else {
					if (menuStore().type != item.type) menuStore().choiceType(item.type);
					if (item.root) {
						let rs = item.root.split("/");
						let roots = [];
						rs.forEach(r => {
							roots.push(roots.length > 0 ? roots[roots.length - 1] + "/" + r : r);
						});
						opens.value = roots;
						// nextTick(() => {
						// 	menuRef.value.updateOpened();
						// 	menuRef.value.updateActiveName();
						// });
					} else {
						let roots = [item.title];
						opens.value = roots;
						// nextTick(() => {
						// 	menuRef.value.updateOpened();
						// 	menuRef.value.updateActiveName();
						// });
					}
				}
			} else {
				let item = menuStore().first;
				if (item) {
					router.replace({ name: item.name });
				} else {
					router.goLogin();
				}
			}
		}
	}
	watch(
		() => router.currentRoute.value,
		route => {
			current.value = route.meta.menuName || route.meta.name;
			checkCurrent();
		},
		{ immediate: true }
	);
</script>

<style lang="scss" scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
	}
	.my-menu {
		min-width: 200px;
	}
	.custom-menu-popper {
		max-height: 400px;
		/* 设置最大高度 */
		overflow-y: auto;
		/* 添加垂直滚动条 */
	}
</style>
