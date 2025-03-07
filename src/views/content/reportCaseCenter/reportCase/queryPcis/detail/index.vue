<!-- 报案详情 -->
<template>
	<div class="">
		<div class="flex">
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
			<div style="width: 200px">123123</div>
		</div>
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
<style scoped lang="scss"></style>
