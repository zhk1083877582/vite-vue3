<!-- 我的工作 -->
<template>
	<div class="">
		<dt-search ref="searchRef" :xlBtn="6" :labelWidth="110"> </dt-search>
		<dt-grid ref="tableRef" :onFetch="onFetch" page> </dt-grid>
		<dt-org-modal ref="orgModalRef" @selectOrg="getOrglist" />
	</div>
</template>

<script setup>
	import { searchOpt } from "./opt/search";
	import { listColumn } from "./opt/columns.js";
	import employeeMgr from "./biz/index";
	import date from "../../../../option/date.js";
	const [tableRef, searchRef, orgModalRef] = [ref(), ref(), ref()];
	let [flag, flagList] = [ref(), ref()];
	let optionsList = ref({ orgList1: [], orgList2: [] });
	let searchInfo = ref({});
	let fun = {};

	function onFetch(data) {
		let params = {
			...data
		};

		return employeeMgr.getUserListFun(params).then(res => {
			return res;
		});
	}
	const searchFun = {
		showOrgModal: data => {
			flag.value = data.key;
			flagList.value = data.listFlag;
			orgModalRef.value.show();
		},
		optionsList: optionsList.value,
		getOrglist: () => {
			return optionsList.value[flagList.value];
		}
	};

	function getOrglist(data) {
		let list = [{ key: data.id, value: data.name }];
		optionsList.value[flagList.value] = list;
		nextTick(() => {
			searchInfo.value[flag.value] = data.id;
			searchRef.value.update(new searchOpt(searchFun), searchInfo.value);
		});
	}
	onMounted(() => {
		searchRef.value.init(tableRef.value, new searchOpt(searchFun), searchInfo.value);
		tableRef.value.init(new listColumn(fun));
		tableRef.value.fetch();
	});
</script>
<style scoped lang="scss"></style>
