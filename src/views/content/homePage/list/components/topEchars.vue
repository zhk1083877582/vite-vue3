<template>
	<div class="custom-card">
		<div class="custom-card-header">
			<div class="title custom-text">任务统计图</div>
		</div>
		<div class="custom-card-body">
			<div ref="chartRef" style="height: 300px"></div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, computed, watch } from "vue";
	import { useECharts } from "@/utils/echarts/useECharts.ts";
	import { settingStore } from "@/store/setting";
	import { menuStore } from "@/store/menu";

	const chartRef = ref(null);
	const { setOptions, removeResize, resize } = useECharts(chartRef);
	const menuType = computed(() => settingStore().menuType);
	const menuIsCollapse = computed(() => menuStore().menuIsCollapse);
	// 监听菜单状态变化
	watch([menuType, menuIsCollapse], (newValues, oldValues) => {
		console.log("🚀 ~ topEchars.vue:30 ~ watch ~ newValues, oldValues:", newValues, oldValues);
		const delays = [100, 200, 300];
		delays.forEach(delay => {
			setTimeout(resize, delay);
		});
	});

	// 创建图表选项
	const createChartOption = () => ({
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		grid: {
			top: "15%",
			left: "3%",
			right: "1%",
			bottom: "1%",
			containLabel: true
		},
		legend: {
			orient: "horizontal",
			data: ["待处理", "处理中", "已处理", "退回", "上报"],
			top: 0,
			right: 30,
			itemWidth: 10,
			itemHeight: 10,
			itemGap: 15,
			textStyle: {
				color: "#FFF"
			}
		},
		xAxis: {
			type: "category",
			data: ["1月", "2月", "3月", "4月", "5月", "6月"],
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: "#FFF"
			}
		},
		yAxis: {
			type: "value",
			axisLine: { show: false },
			axisTick: { show: false },
			splitLine: {
				lineStyle: {
					color: "#EFF1F3",
					width: 0.8
				}
			},
			axisLabel: { color: "#FFF" }
		},
		series: [
			{
				name: "待处理",
				type: "bar",
				data: [8423, 1323, 534, 1555, 1065, 1534, 182],
				barWidth: "10",
				itemStyle: {
					color: "#FA9D3E",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "处理中",
				type: "bar",
				data: [1230, 1341, 4550, 523, 1551, 1663, 1220],
				barWidth: "10",
				itemStyle: {
					color: "#62d4b1",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "已处理",
				type: "bar",
				data: [1220, 1331, 2440, 5555, 1661, 1773, 820],
				barWidth: "10",
				itemStyle: {
					color: "#f19ac0",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "退回",
				type: "bar",
				data: [1022, 1133, 2440, 5555, 1431, 1345, 1230],
				barWidth: "10",
				itemStyle: {
					color: "#9d98f2",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "上报",
				type: "bar",
				data: [23, 444, 545, 464, 675, 789, 345],
				barWidth: "10",
				itemStyle: {
					color: "#97AACA",
					borderRadius: [4, 4, 4, 4]
				}
			}
		]
	});

	// 初始化图表
	const initChart = () => {
		if (chartRef.value) {
			const option = createChartOption();
			setOptions(option);
		}
	};

	onMounted(() => {
		initChart();
	});

	onUnmounted(() => {
		removeResize();
	});
</script>

<style lang="scss" scoped>
	.custom-card {
		background: rgba(255, 255, 255, 0.1);
		border-left: 1px solid rgba(0, 0, 0, 0.1);
		&-body {
			padding: 15px;
		}
		.custom-card-header {
			position: absolute;
			left: 20px;
			top: 30px;
			z-index: 99;
			text-align: center;
			padding: 5px 10px;
			border-radius: 4px;
			background-color: var(--el-color-primary);
			font-size: 14px;
		}
	}
</style>
