<!-- 我的工作 -->
<template>
	<div class="">
		<dt-search ref="searchRef" :xlBtn="6" :labelWidth="110">
			<el-button @click="changeAdvanced" type="primary">{{ isShowAdvanced ? "关闭" : "展开" }}高级搜索</el-button>
		</dt-search>
		<dt-grid ref="tableRef" :onFetch="onFetch" page> </dt-grid>
	</div>
</template>

<script setup>
	import router from "@/router";
	import { searchOpt } from "./opt/search";
	import { listColumn } from "./opt/columns.js";
	import employeeMgr from "./biz/index";
	const [tableRef, searchRef] = [ref(), ref()];
	let isShowAdvanced = ref(false);
	let searchInfo = ref({});
	let fun = {
		onEdit: () => {
			router.goRoot("reportCaseCenter/reportCase/queryPcis/detail", { id: "123123" });
		}
	};

	function onFetch(data) {
		let params = {
			...data
		};
		console.log("🚀 ~ onFetch ~ params:", params);

		return employeeMgr.getUserListFun(params).then(res => {
			console.log("🚀 ~ returnemployeeMgr.getUserListFun ~ res:", res.list.length);
			return res;
		});
	}
	let searchFun = {
		showAdvanced: () => {
			return isShowAdvanced.value;
		}
	};
	function changeAdvanced() {
		isShowAdvanced.value = !isShowAdvanced.value;
		searchRef.value.update(new searchOpt(searchFun), searchInfo.value);
	}
	onMounted(() => {
		console.log(123123);
		searchRef.value.init(tableRef.value, new searchOpt(searchFun), searchInfo.value);
		tableRef.value.init(new listColumn(fun));
		tableRef.value.fetch();
	});
</script>
<style scoped lang="scss"></style>
