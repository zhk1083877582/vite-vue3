<!-- 承保信息 -->
<template>
	<div>
		<dt-content-warp title="承保信息">
			<dt-info ref="underwriteMsgRef" :labelWidth="140" :lineNumber="3"></dt-info>
		</dt-content-warp>
		<dt-content-warp title="费用信息">
			<dt-grid ref="costTableRef" :onFetch="onFetch" :height="300"></dt-grid>
		</dt-content-warp>
		<dt-content-warp title="再保信息">
			<dt-grid ref="reinsuranceTableRef" :onFetch="onFetch1" :height="300"></dt-grid>
		</dt-content-warp>
	</div>
</template>

<script setup>
	import { underwriteMsgOpt, costColumn, reinsuranceColumn } from "../opt/underwriteOpt.js";
	let underwriteMsgInfo = ref({});
	let [underwriteMsgRef, costTableRef, reinsuranceTableRef] = [ref(), ref(), ref()];

	function onFetch(data) {
		return Promise.resolve([]);
		// return employeeMgr.getUserListFun(params).then(res => {
		// 	return res;
		// });
	}
	function onFetch1(data) {
		return Promise.resolve([
			// {
			// 	key1: "123",
			// 	key2: "456",
			// 	key3: "789"
			// }
		]);
		// return employeeMgr.getUserListFun(params).then(res => {
		// 	return res;
		// });
	}
	function initCost() {
		costTableRef.value.init(new costColumn());
		costTableRef.value.fetch();
	}
	function initReinsurance() {
		reinsuranceTableRef.value.init(new reinsuranceColumn());
		reinsuranceTableRef.value.fetch();
	}
	function init() {
		underwriteMsgRef.value.init(new underwriteMsgOpt(), underwriteMsgInfo.value);
		initCost();
		initReinsurance();
	}
	defineExpose({
		init
	});
</script>
<style scoped lang="scss"></style>
