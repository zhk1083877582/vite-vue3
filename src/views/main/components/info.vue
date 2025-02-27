<template>
	<div class="info-warp">
		<div style="cursor: pointer" class="setting" @click="choiceType">设置</div>
		<div style="cursor: pointer" @click="logout">退出</div>
	</div>
</template>

<script setup>
	import dt from "@/config/dt";
	import router from "@/router";
	import { userStore } from "@/store/user";
	const logout = () => {
		dt.session.remove("dt_auth");
		router.replace("/login");
	};
	const choiceType = () => {
		let type = userStore().menuType == "top" ? "left" : "top";
		userStore().choiceMenuType(type);
	};
</script>

<style lang="scss" scoped>
	.info-warp {
		display: flex;
		line-height: 34px;
		padding: 0 10px;
	}
	.setting {
		margin: 0 5px;
	}
</style>
