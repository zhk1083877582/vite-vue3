<!-- 首页 -->
<template>
	<el-row style="margin-bottom: 10px">
		<el-col :span="24">
			<el-card :bordered="false">
				<top-echars />
			</el-card>
		</el-col>
	</el-row>
	<el-row :gutter="20">
		<el-col :span="16">
			<el-card :bordered="false">
				<div style="display: flex; justify-content: space-between">
					<div style="line-height: 32px" class="new-cl">最新任务（近一个月）</div>
					<el-button>更多</el-button>
				</div>
				<dt-grid ref="tableRef" :onFetch="onFetch" :height="400"> </dt-grid>
			</el-card>
		</el-col>
		<el-col :span="8" class="tips_warp">
			<el-card :bordered="false" class="index-blk" style="height: 100%; box-sizing: border-box">
				<div>
					<div style="text-align: left; display: flex; justify-content: space-between; line-height: 34px">
						提醒信息
						<el-button class="to_more">更多</el-button>
					</div>
					<ul class="index_msg">
						<li class="flex tips_item" v-for="(data, index) in tableNoticeCnt" :key="index">
							<div style="width: 40px; height: 40px; border: 1px solid #ccc; border-radius: 50%; margin-right: 10px">
								<el-icon style="font-size: 28px; width: 100%; height: 100%"><CollectionTag /></el-icon>
							</div>
							<div class="width-100 flex-1">
								<div style="font-size: 13px" class="flex flex-horizontal-between">
									<p class="time_title">{{ data.title }}</p>
									<span class="time">{{ data.datetime }}</span>
								</div>
								<span style="font-size: 13px; margin-top: 5px" :title="data.description">{{ data.description }}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
	import topEchars from "./components/topEchars.vue";
	import { listColumn } from "./opt/columns.js";
	import apiMgr from "./biz/index";

	const [tableRef] = [ref()];
	const tableNoticeCnt = ref();

	tableNoticeCnt.value = [
		{
			title: "测试",
			datetime: "2025.02.05 14:00:00",
			description: "描述"
		},
		{
			title: "测试1",
			datetime: "2025.02.05 14:00:00",
			description: "描述"
		},
		{
			title: "测试2",
			datetime: "2025.02.05 14:00:00",
			description: "描述"
		},
		{
			title: "测试3",
			datetime: "2025.02.05 14:00:00",
			description: "描述"
		}
	];
	function fun() {}
	onMounted(() => {
		tableRef.value.init(new listColumn(fun));
		tableRef.value.fetch();
	});
	function onFetch(data) {
		let params = {
			...data
		};
		console.log("🚀 ~ onFetch ~ params:", params);

		return apiMgr.getUserListFun(params).then(res => {
			console.log("🚀 ~ returnemployeeMgr.getUserListFun ~ res:", res.list.length);
			return res.list;
		});
	}
</script>
<style scoped lang="scss">
	.new-cl {
		color: var(--el-color-primary);
	}
	.tips_warp {
		height: 473px;
		overflow-y: auto;
	}
	.tips_item {
		margin-top: 10px;
	}
</style>
