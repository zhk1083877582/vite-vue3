<template>
	<div class="custom-card art-custom-card total-revenue">
		<div class="custom-card-header">
			<span class="title custom-text">任务统计图</span>
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
	// import { useI18n } from 'vue-i18n'

	// const { t } = useI18n()

	// const store = useSettingStore()
	// const isDark = computed(() => store.isDark)

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
			top: 20,
			right: 3,
			bottom: 40,
			left: 3,
			containLabel: true
		},
		legend: {
			data: ["超时案件", "大额赔案", "涉诉赔案", "预付案件"],
			bottom: 0,
			icon: "circle",
			itemWidth: 10,
			itemHeight: 10,
			itemGap: 15,
			textStyle: {
				fontSize: 12,
				color: "#222B45"
			}
		},
		xAxis: {
			type: "category",
			data: ["2024-10", "2024-11", "2024-12", "2025-01", "2025-02", "2025-03"],
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: "#7B91B0"
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
			axisLabel: { color: "#7B91B0" }
		},
		series: [
			{
				name: "超时案件",
				type: "bar",
				data: [8423, 1323, 534, 1555, 1065, 1534, 182],
				barWidth: "30",
				itemStyle: {
					color: "#FA9D3E",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "大额赔案",
				type: "bar",
				data: [1230, 1341, 4550, 523, 1551, 1663, 1220],
				barWidth: "30",
				itemStyle: {
					color: "#00E096",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "涉诉赔案",
				type: "bar",
				data: [1220, 1331, 2440, 5555, 1661, 1773, 820],
				barWidth: "30",
				itemStyle: {
					color: "#F19AC0",
					borderRadius: [4, 4, 4, 4]
				}
			},
			{
				name: "预付案件",
				type: "bar",
				data: [1022, 1133, 2440, 5555, 1431, 1345, 1230],
				barWidth: "30",
				itemStyle: {
					color: "#9D98F2",
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

	// 监听暗黑模式变化
	// watch(
	//   isDark,
	//   () => {
	//     initChart()
	//   },
	//   { immediate: true }
	// )

	onUnmounted(() => {
		removeResize();
	});
</script>

<style lang="scss" scoped>
	.custom-card {
		height: 400px;

		&-body {
			padding: 20px;
		}
	}
</style>
