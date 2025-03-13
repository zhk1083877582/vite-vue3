<template>
	<div class="info-warp">
		<div class="btn-box">
			<!-- 提醒信息 -->
			<!-- <tips-msg /> -->
			<div class="btn setting-btn" @click="choiceType">
				<el-icon size="20"><Setting /></el-icon>
			</div>
			<!-- 用户头像、菜单 -->
			<user-info />
		</div>
		<div style="display: flex; width: 200px">
			<el-select v-model="userInfoOrg" style="align-self: center" size="default">
				<el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </el-option>
			</el-select>
		</div>
	</div>
</template>

<script setup>
	import dt from "@/config/dt";
	import userInfo from "./userInfo.vue";
	import tipsMsg from "./tipsMsg.vue";
	const [changePasswordRef] = [ref()];

	const choiceType = () => {
		dt.notify.emit("openSetting");
	};
	let userInfoOrg = ref(1);
	const options = ref([
		{
			key: 1,
			value: "总公司"
		},
		{
			key: 2,
			value: "山东分公司"
		}
	]);

	onMounted(() => {});
</script>

<style lang="scss" scoped>
	@use "./index.scss";
</style>
