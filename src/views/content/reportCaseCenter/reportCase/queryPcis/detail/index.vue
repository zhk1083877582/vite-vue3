<!-- 报案详情 -->
<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="20">
				<div class="flex-1">
					<el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" @tab-change="changeTab">
						<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
							<!-- {{ item.content }} -->
						</el-tab-pane>
					</el-tabs>
					<report-msg ref="reportMsgRef" v-show="tabsValue == 'reportMsg'" />
					<underwrite-msg ref="underwriteMsgRef" v-show="tabsValue == 'underwriteMsg'" />
					<case-explain ref="caseExplainRef" v-show="tabsValue == 'caseExplain'" />
				</div>
			</el-col>
			<el-col :span="4">
				<el-affix :offset="120">
					<div class="btns-cl">
						<el-button type="primary" class="btn">保存</el-button>
						<el-button type="primary" class="btn">提交</el-button>
						<el-button type="primary" class="btn">返回</el-button>
						<el-button type="primary" class="btn">大案上报</el-button>
					</div>
				</el-affix>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import reportMsg from "./components/reportMsg.vue";
	import underwriteMsg from "./components/underwriteMsg.vue";
	import caseExplain from "./components/caseExplain.vue";
	const [reportMsgRef, underwriteMsgRef, caseExplainRef] = [ref(), ref(), ref()];
	let tabsValue = ref("reportMsg");
	const editableTabs = ref([
		{ title: "报案信息", name: "reportMsg", content: "reportMsg" },
		{ title: "承保信息", name: "underwriteMsg", content: "underwriteMsg" },
		{ title: "案件说明", name: "caseExplain", content: "caseExplain" }
	]);
	const removeTab = () => {};
	const changeTab = () => {};
	onMounted(() => {
		reportMsgRef.value.init();
	});
</script>
<style scoped lang="scss">
	@use "@/assets/element/variables.scss" as *;
	.btns-cl {
		padding: 10px;
		box-shadow: var(--dt-box-shadow);
		.btn {
			width: 180px;
			margin-top: 10px;
			margin-left: 0px;
		}
	}
</style>
