<!-- 报案信息 -->
<template>
	<div>
		<dt-content-warp title="报案信息">
			<dt-info ref="msgRef" :labelWidth="140" :lineNumber="3"></dt-info>
		</dt-content-warp>
		<dt-content-warp title="出险信息">
			<dt-info ref="dangerRef" :labelWidth="140" :lineNumber="3"></dt-info>
		</dt-content-warp>
		<dt-content-warp title="指定调度人员">
			<dt-info ref="designeeRef" :labelWidth="140" :lineNumber="3"></dt-info>
		</dt-content-warp>
	</div>
</template>

<script setup>
	import { reportMsgOpt, dangerMsgOpt, designeeMsgOpt } from "../opt/reportOpt";
	import moment from "moment";
	const [msgRef, dangerRef, designeeRef] = [ref(), ref(), ref()];
	const [reportMsgInfo, dangerMsgInfo, designeeMsgInfo] = [
		ref({ key3: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), key4: 1 }),
		ref({
			key1: "1111",
			key2: "01",
			key3: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
			key8: 1,
			provinceCode: "120000",
			cityCode: "120102",
			areaCode: "130104"
		}),
		ref({ name: "qweqwe" })
	];
	let dangerMsgFn = {
		resetField: arr => {
			dangerRef.value.resetValidate(arr);
		}
	};
	function init() {
		console.log("🚀 ~ reportMsg.vue:39 ~ init ~ init:");
		msgRef.value.init(new reportMsgOpt(), reportMsgInfo.value);
		dangerRef.value.init(new dangerMsgOpt({ dangerMsgFn, infoData: dangerMsgInfo.value }), dangerMsgInfo.value);
		designeeRef.value.init(new designeeMsgOpt(), designeeMsgInfo.value);
	}
	defineExpose({
		init
	});
</script>
<style scoped lang="scss"></style>
