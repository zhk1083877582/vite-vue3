<script setup>
	import { RouterView } from "vue-router";
	import dt from "@/config/dt";
	import zhCn from "element-plus/es/locale/lang/zh-cn";
	import { settingStore } from "@/store/setting";
	onMounted(() => {
		settingStore().initSettingState();
		settingStore().saveSettingData();
	});
</script>

<template>
	<el-config-provider :locale="zhCn">
		<RouterView />
	</el-config-provider>
</template>

<style>
	@import url("@/assets/css/main.scss");
</style>
