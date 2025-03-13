<!-- 报案详情 -->
<template>
	<div class="">
		<el-row :gutter="20">
			<el-col :span="20">
				<div class="flex-1">
					<el-affix :offset="46">
						<el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" @tab-change="changeTab" style="width: 100%; background-color: #fff">
							<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
								<!-- {{ item.content }} -->
							</el-tab-pane>
						</el-tabs>
					</el-affix>
					<div v-show="tabsValue == 'reportMsg'">
						<report-msg ref="reportMsgRef" />
					</div>
					<div v-show="tabsValue == 'underwriteMsg'">
						<underwrite-msg ref="underwriteMsgRef" />
					</div>
					<div v-show="tabsValue == 'caseExplain'">
						<case-explain ref="caseExplainRef" />
					</div>
				</div>
			</el-col>
			<el-col :span="4">
				<el-affix :offset="120" style="width: 100%">
					<div class="btns-cl">
						<el-button type="primary" class="btn">保存</el-button>
						<el-button type="primary" class="btn">提交</el-button>
						<el-button type="primary" class="btn" @click="goBack">返回</el-button>
						<el-button type="primary" class="btn">大案上报</el-button>
					</div>
				</el-affix>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
	import router from "@/router";
	import reportMsg from "./components/reportMsg.vue";
	import underwriteMsg from "./components/underwriteMsg.vue";
	import caseExplain from "./components/caseExplain.vue";
	const [reportMsgRef, underwriteMsgRef, caseExplainRef] = [ref(), ref(), ref()];
	let tabsValue = ref("underwriteMsg");
	const editableTabs = ref([
		{ title: "报案信息", name: "reportMsg", content: "reportMsg" },
		{ title: "承保信息", name: "underwriteMsg", content: "underwriteMsg" },
		{ title: "案件说明", name: "caseExplain", content: "caseExplain" }
	]);
	const removeTab = () => {};
	const changeTab = () => {};
	const goBack = () => {
		router.go(-1);
	};
	onMounted(() => {
		console.log("🚀 ~ index.vue:52 ~ onMounted ~ onMounted: ");
		reportMsgRef.value.init();
		underwriteMsgRef.value.init();
	});
</script>
<style scoped lang="scss">
	@use "@/assets/element/variables.scss" as *;
	.btns-cl {
		padding: 10px;
		box-shadow: var(--dt-box-shadow);
		.btn {
			width: 100%;
			margin-top: 10px;
			margin-left: 0px;
		}
	}
</style>
