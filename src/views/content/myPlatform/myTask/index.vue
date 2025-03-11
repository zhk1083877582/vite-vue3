<!-- 我的任务 -->
<template>
	<div class="">
		<el-row :gutter="10">
			<el-col :span="3" class="tabs-cl">
				<el-tabs tab-position="left" v-model="tabsValue" @tab-change="changeTab">
					<el-tab-pane v-for="item in tabsList" :key="item.key" :label="item.label" :name="item.key">
						<template #label>
							<span class="custom-tabs-label">
								<span>{{ item.label }}（{{ item.taskNum }}）</span>
							</span>
						</template>
					</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="21">
				<dt-search ref="searchRef" :xlBtn="6" :labelWidth="110"> </dt-search>
				<dt-grid ref="tableRef" :onFetch="onFetch" page> </dt-grid>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import { searchOpt } from "./opt/search";
	import { listColumn, getTabsList } from "./opt/columns.js";
	import employeeMgr from "./biz/index";
	import dt from "@/config/dt";
	const [tableRef, searchRef] = [ref(), ref()];
	const tabsValue = ref(1);
	let tabsList = getTabsList();
	let searchInfo = ref({});
	let fun = {
		onClaim: row => {
			dt.ui
				.messageBox({
					title: `认领`,
					message: `请确认,是否认领任务`
				})
				.then(() => {
					// employeeMgr
					// 	.disableUsers({
					// 		userIds: [row.id],
					// 		state: row.state == "1" ? 0 : 1
					// 	})
					// 	.then(res => {
					// 		onSearch();
					// 	});
				});
		},
		onSend: row => {
			console.log("🚀 ~ index.vue:31 ~ row:", row);
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

	function changeTab(data) {
		console.log("🚀 ~ changeTab ~ changeTab:", data);
	}
	onMounted(() => {
		searchRef.value.init(tableRef.value, new searchOpt(), searchInfo.value);
		tableRef.value.init(new listColumn(fun));
		tableRef.value.fetch();
	});
</script>
<style scoped lang="scss">
	.tabs-cl {
		height: calc(100vh - 120px);
		overflow-y: auto;

		:deep(.el-tabs__content) {
			display: none;
		}
		:deep(.el-tabs--left .el-tabs__header.is-left) {
			width: 100%;
			margin-right: 0;
		}
		:deep(.el-tabs--left .el-tabs__nav-wrap.is-left) {
			width: 100%;
		}
		:deep(.el-tabs--left .el-tabs__nav.is-left) {
			width: 100%;
		}
		:deep(.el-tabs--left .el-tabs__item.is-left, .el-tabs--right .el-tabs__item.is-left) {
			text-align: center;
			justify-content: center;
		}
	}
	::-webkit-scrollbar {
		width: 0px !important;
		height: 0 !important;
	}
</style>
