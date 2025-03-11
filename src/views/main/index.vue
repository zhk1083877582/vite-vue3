<template>
	<div>
		<div
			style="background: white; display: flex"
			:style="{
				height: contentHeight + 'px',
				width: contentWidth + 'px'
			}"
		>
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
				<div class="contain" :style="{ height: contentHeight - 90 + 'px' }">
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
	import elMenu from "./components/el-menu.vue";
	import navigation from "./components/navigation.vue";
	import setting from "./components/setting/index.vue";
	import { ref, watch } from "vue";
	import router from "@/router";
	import { settingStore } from "@/store/setting";

	const contentHeight = ref(window.innerHeight);
	const contentWidth = ref(window.innerWidth);
	window.addEventListener("resize", () => {
		contentHeight.value = window.innerHeight;
		contentWidth.value = window.innerWidth;
	});

	const meta = ref();
	watch(
		() => router.currentRoute.value,
		route => {
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
