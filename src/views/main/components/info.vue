<template>
	<div>
		<div @click="choiceType">设置</div>
		<div @click="logout">退出</div>
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

<style lang="sass" scoped></style>
