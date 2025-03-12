<!-- 修改密码 -->
<template>
	<dt-modal-edit ref="changePasswordRef" title="修改密码" :width="500" @ok="onOk" :label-width="120"></dt-modal-edit>
</template>

<script setup>
	import { changeOpt } from "./opt/changePassword.js";
	const [changePasswordRef] = [ref()];
	let changePasswordInfo = ref({ oldPassword: "", newPassword: "", verifyPassword: "" });
	function onOk(data) {
		console.log("🚀 ~ info.vue:74 ~ onOk ~ data:", data);
	}
	function show() {
		changePasswordRef.value.show(new changeOpt({ infoData: changePasswordInfo.value }), changePasswordInfo.value);
	}
	defineExpose({
		show
	});
</script>
<style scoped lang="scss"></style>
