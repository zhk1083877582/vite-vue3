<template>
	<div>
		<div
			style="background: white; display: flex"
			:style="{
				height: contentHeight + 'px',
				width: contentWidth + 'px'
			}"
		>
			<!-- <sider /> -->
			<el-menu v-if="settingStore().menuType == 'LEFT'" />
			<div
				style="flex: 1"
				:style="{
					height: contentHeight + 'px',
					width: contentWidth - 200 + 'px'
				}"
			>
				<navigation />
				<setting />
				<!-- <tabs /> -->
				<div class="contain" :style="{ height: contentHeight - 90 + 'px' }">
					<!-- 面包屑 -->
					<!-- <breadcrumb /> -->
					<RouterView v-slot="{ Component }">
						<component :is="Component" v-if="!meta.keep" :key="meta.name" />
						<KeepAlive>
							<component :is="Component" v-if="meta.keep" :key="meta.name" />
						</KeepAlive>
					</RouterView>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { RouterView } from "vue-router";
	// import tabs from "./components/tabs.vue";
	import elMenu from "./components/el-menu.vue";
	// import sider from './components/sider.vue'
	import navigation from "./components/navigation.vue";
	import Breadcrumb from "./components/Breadcrumb/index.vue";
	import setting from "./components/setting/index.vue";
	import { nextTick, ref, watch } from "vue";
	import router from "@/router";
	import { settingStore } from "@/store/setting";

	const contentHeight = ref(window.innerHeight);
	const contentWidth = ref(window.innerWidth);
	window.addEventListener("resize", () => {
		contentHeight.value = window.innerHeight;
		contentWidth.value = window.innerWidth;
	});

	const meta = ref();
	let currentObj = ref();
	watch(
		() => router.currentRoute.value,
		route => {
			nextTick(() => {
				// console.log("🚀 ~ index.vue:66 ~  menuStore().dic[router.currentRoute.value.name]:", menuStore().dic[router.currentRoute.value.name]);
				// currentObj.value = menuStore().dic[router.currentRoute.value.name];
				// console.log("🚀 ~ index.vue:67 ~ currentObj.value:", currentObj.value.root + "/" + currentObj.value.title);
			});

			meta.value = route.meta;
		},
		{ immediate: true }
	);
</script>
<style lang="scss" scoped>
	@import url("@/assets/css/sider.scss");
	.contain {
		padding: 10px;
		flex: 1;
		overflow: hidden;
		overflow-y: auto;
		box-sizing: border-box;
	}
</style>
