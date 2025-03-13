<!-- 提醒信息 -->
<template>
	<div class="btn">
		<el-popover
			placement="bottom-end"
			:width="300"
			:hide-after="0"
			:offset="20"
			trigger="click"
			popper-class="tips-popover"
			@show="showPopover"
			popper-style="padding:0"
		>
			<template #reference>
				<el-icon><Bell /></el-icon>
			</template>
			<template #default>
				<div class="title">提醒</div>

				<ul class="tips_warp" v-if="tableNoticeCnt.length">
					<li class="flex tips_item" v-for="(data, index) in tableNoticeCnt" :key="index">
						<div class="icon-warp">
							<el-icon style="font-size: 22px; width: 100%; height: 100%; color: #fff"><Message /></el-icon>
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
				<div v-else>
					<el-empty :image-size="100" description="您已查看所有提醒" />
				</div>
			</template>
		</el-popover>
	</div>
</template>

<script setup>
	import dt from "@/config/dt";
	import router from "@/router";
	const tableNoticeCnt = ref([]);
	function showPopover() {
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
	}
</script>

<style lang="scss" scoped>
	@use "./index.scss";
	.tips-popover {
		padding: 0;
		.title {
			font-size: 16px;
			text-align: center;
			width: 100%;
			line-height: 28px;
			border-bottom: 1px solid var(--dt-border-color);
			padding: 5px 0;
		}
		.tips_warp {
			height: 300px;
			overflow-y: auto;
			padding: 10px;
		}
		.tips_item {
			margin-top: 10px;
			.icon-warp {
				width: 40px;
				height: 40px;
				border: 1px solid #ccc;
				border-radius: 50%;
				margin-right: 10px;
				background-color: var(--el-color-primary);
			}
		}
	}
</style>
