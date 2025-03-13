<!-- 报案列表 -->
<template>
	<div class="">
		<dt-search ref="searchRef" :xlBtn="6" :labelWidth="110"> </dt-search>
		<dt-grid ref="tableRef" :onFetch="onFetch" page>
			<!-- <template #btn>
				<div class="flex btn-content">
					<el-button type="primary"> gridBtn1 </el-button>
					<el-button type="primary"> gridBtn1 </el-button>
				</div>
			</template> -->
		</dt-grid>
		<dt-org-modal ref="orgModalRef" @selectOrg="getOrglist" />
	</div>
</template>

<script setup>
	import { searchOpt } from "./opt/search";
	import { listColumn } from "./opt/columns.js";
	import employeeMgr from "./biz/index";
	import router from "@/router";
	const [tableRef, searchRef, orgModalRef] = [ref(), ref(), ref()];
	let orglist = ref([]);
	let searchInfo = ref({});
	let fun = {
		onEdit: () => {
			// router.goRoot("reportCaseCenter/reportCase/queryPcis/detail", { id: "123123" });
		}
	};

	function onFetch(data) {
		let params = {
			...data
		};

		return employeeMgr.getUserListFun(params).then(res => {
			return res;
		});
	}
	const searchFun = {
		showOrgModal: () => {
			orgModalRef.value.show();
		},
		getOrglist: () => {
			return orglist.value;
		}
	};

	function getOrglist(data) {
		let list = [{ key: data.id, value: data.name }];
		orglist.value = list;
		nextTick(() => {
			searchInfo.value.orgId = data.id;
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
