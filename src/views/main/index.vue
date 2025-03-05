<template>
	<div>
		<navigation />
		<div
			style="background: white; display: flex"
			:style="{
				height: contentHeight + 'px',
				width: contentWidth + 'px'
			}"
		>
			<!-- <sider /> -->
			<el-menu v-if="userStore().menuType == 'left'" />
			<div
				style="padding: 10px; flex: 1"
				:style="{
					height: contentHeight + 'px',
					width: contentWidth - 200 + 'px'
				}"
			>
				<!-- <tabs /> -->
				<div
					class="contain"
					:style="{
						height: contentHeight - 114 + 'px',
						overflowY: 'auto'
					}"
				>
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
	import { onMounted, ref, watch } from "vue";
	import router from "@/router";
	import { userStore } from "@/store/user";
	import { menuStore } from "@/store/menu";
	onMounted(() => {
		// menuStore().item;
		console.log("🚀 ~ index.vue:53 ~ onMounted ~ menuStore().item:", menuStore().update());
	});
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
	}
</style>
