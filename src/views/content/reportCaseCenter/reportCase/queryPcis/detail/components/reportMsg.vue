<!-- 报案信息 -->
<template>
	<div class="">
		<dt-content-warp title="报案信息">
			<dt-info ref="msgRef" :labelWidth="140" :lineNumber="3"></dt-info>
		</dt-content-warp>
		<dt-content-warp title="出险信息">
			<dt-info ref="dangerRef" :labelWidth="140" :lineNumber="3"></dt-info>
		</dt-content-warp>
	</div>
</template>

<script setup>
	import { reportMsgOpt, dangerMsgInfoOpt } from "../opt/reportOpt";
	import moment from "moment";
	const [msgRef, dangerRef] = [ref(), ref()];
	const [reportMsgInfo, dangerMsgInfo] = [ref({ key3: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), key4: 1 }), ref({ key1: "1111", provinceCode: "120000", cityCode: "120102", areaCode: "130104" })];
	function init() {
		msgRef.value.init(new reportMsgOpt(), reportMsgInfo.value);
		dangerRef.value.init(new dangerMsgInfoOpt({ infoData: dangerMsgInfo.value }), dangerMsgInfo.value);
	}
	defineExpose({
		init
	});
</script>
<style scoped lang="scss"></style>
