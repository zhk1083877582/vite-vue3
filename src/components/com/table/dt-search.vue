<!-- 搜索组件 -->
<template>
	<div class="dt-search">
		<el-form ref="formRef" :model="info" :label-width="labelWidth" :label-colon="true" @submit.native.prevent>
			<el-row :gutter="12" :key="rowKey">
				<el-col v-for="(opt, index) in options" :key="index" :xl="opt.xl || xl" :sm="12" :md="8" :lg="8">
					<div v-if="opt.visible != false" style="width: 100%">
						<dt-info-item ref="itemRef" :option="opt" :info="info" @change="onChange" />
					</div>
				</el-col>

				<!-- 按钮 -->
				<el-col :xl="xlBtn" :sm="20" :md="10" :lg="10">
					<el-form-item :label-width="5" class="handle-btn">
						<el-button @click="reset">重置</el-button>
						<el-button type="primary" @click="onSearch">搜索</el-button>
						<slot></slot>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup>
	import { watch, ref } from "vue";
	import dtInfo from "../info";
	const props = defineProps({
		modelValue: Object,
		labelWidth: { type: Number, default: 100 },
		xl: { type: Number, default: 6 },
		xlBtn: { type: Number, default: 8 }
	});
	const emits = defineEmits(["update:modelValue", "reset", "search", "change"]);

	const [itemRef, formRef] = [ref(), ref()];
	const [initInfo, info, options] = [ref(), ref(), ref([])];
	const [tableRef, rowKey] = [ref(), ref(1)];

	function init(table, Opt, inf = {}) {
		tableRef.value = table;
		updateOptions(Opt.options());
		info.value = inf;
		initInfo.value = { ...inf };
		tableRef.value?.updateSearchInfo(info.value);
	}

	function clear() {
		return new Promise((resolve, reject) => {
			let items = itemRef.value?.option ? [itemRef.value] : itemRef.value || [];
			items.forEach(item => {
				let val = initInfo.value[item.option.key];
				if (val == null || val.length == 0) item.clear();
			});
			setTimeout(() => {
				for (let key in info.value) {
					info.value[key] = initInfo.value[key] || null;
				}
				tableRef.value?.updateSearchInfo(info.value);
				emits("update:modelValue", info.value);
				resolve();
			}, 500);
		});
	}

	function reset() {
		rowKey.value++;
		formRef.value.resetFields();
		clear().then(res => {
			emits("reset");
			tableRef.value?.search();
		});
	}

	function onSearch() {
		formRef.value.validate(valid => {
			if (valid) {
				emits("search", info.value);
				tableRef.value?.search();
			}
		});
	}

	function updateOptions(items) {
		options.value = (items || []).map(item => {
			if (item.rules) item.rules = item.rules.filter(i => !i.required);
			return item;
		});
	}

	function onChange() {
		emits("change");
	}

	watch(
		() => props.modelValue,
		n => {
			info.value = n;
			tableRef.value?.updateSearchInfo(info.value);
		},
		{ immediate: true }
	);

	defineExpose({
		init,
		clear,
		reset,
		update(Opt, inf) {
			let opts = Opt.options();
			inf = inf ? { ...initInfo.value, ...inf } : info.value;
			updateOptions(opts);
			info.value = dtInfo.validInfo(inf, opts);
			tableRef.value?.updateSearchInfo(info.value);
			rowKey.value++;
		}
	});
</script>

<style lang="scss" scoped>
	.handle-btn {
		:deep(button) {
			margin-right: 8px;
		}
	}
</style>
