<template>
	<div class="select" v-if="choices.length > 0">
		<div>已选：</div>
		<template v-for="item in choices" :key="item.key">
			<div v-if="item.label" style="margin: 2px 4px 2px 0">
				<el-tag size="large" type="info" closable @close="onClose(item.key)">
					<span v-if="item.title != ''">{{ item.title }}:</span>
					{{ item.label }}
				</el-tag>
			</div>
		</template>
		<el-button type="primary" class="reset" @click="onReset">重置</el-button>
	</div>
	<div v-else></div>
	<div
		v-if="current"
		class="content"
		@mouseover="onMouseover"
		@mouseleave="onMouseleave"
		:style="{ left: left + 'px', top: top + 'px', width: width + 'px' }"
	>
		<!-- 尖头 -->
		<div class="arrow" :style="{ left: iconLeft - left + 'px' }">
			<span></span>
		</div>
		<div class="input">
			<dt-info-edit :option="current" :info="currentInfo" @change="onChange" />
		</div>
		<!-- 底部 -->
		<div class="foot">
			<el-button type="primary" @click="onOK">确定</el-button>
			<el-button type="default" @click="onCancel">取消</el-button>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch, nextTick } from "vue";
	import { Filter } from "./Filter.js";

	const [current, currentInfo, choices, infos] = [ref(), ref({}), ref([]), ref({})];
	const filter = ref(new Filter());
	const options = ref([]);
	const [left, top, width, iconLeft] = [ref(0), ref(0), ref(230), ref(0)];
	const props = defineProps({
		modelValue: Object,
		filter: Filter
	});
	const emits = defineEmits(["update:modelValue", "filter"]);
	let timeout = null;

	watch(
		() => props.filter,
		n => {
			filter.value = n;
			filter.value.updateOpts(options.value);
			update();
		}
	);

	// 处理事件
	function onMouseover(e, opt) {
		e.stopPropagation();
		clearTimeout(timeout);
		if (opt) {
			let w = width.value / 2 - 5;
			let rect = e.currentTarget.getBoundingClientRect();
			let l = rect.left - w;
			let clientWidth = document.documentElement.clientWidth;
			left.value = Math.max(100, Math.min(clientWidth - width.value, l));
			top.value = rect.top + 20;
			iconLeft.value = rect.left;

			if (opt.input) {
				opt.input.prefixIcon = "Search";
			} else if (opt.select) {
				opt.select.transfer = false;
			}
			current.value = null;
			nextTick(() => (current.value = opt));

			filter.value.initOpt(opt);
			currentInfo.value = filter.value.info(opt.key);
		}
	}

	function onMouseleave(e) {
		e.stopPropagation();
		timeout = setTimeout(() => (current.value = null), 1000);
	}

	function onClose(key) {
		filter.value.choice(key, false);
		search();
	}

	function onReset() {
		clear();
		search(true);
	}

	function onOK() {
		if (!current.value.filter || !current.value.filter.check || current.value.filter.check(filter.value.info(current.value.key))) {
			filter.value.choice(current.value.key);
			search();
			current.value = null;
		}
	}

	function onCancel() {
		current.value = null;
	}

	function onChange(data) {
		if (!data.editValue) return;
		filter.value.value(current.value, data.editValue);
	}

	//
	function init(items) {
		options.value = items;
		filter.value.updateOpts(items);
		items.forEach(opt => {
			let key = opt.key;
			let from = opt.data ? opt.data.from : null;
			let to = opt.data ? opt.data.to : null;
			let value = from ? from(props.modelValue) : props.modelValue[key];
			let obj = {};
			if (value) {
				// 只支持原始数据，即转化过的数据不兼容
				if (to) {
					obj = to(value);
				} else {
					obj[key] = value;
				}
				filter.value.initOpt(opt);
				if (!filter.value.info(key)) {
					filter.value.value(opt, value);
					filter.value.choice(key);
				}
				Object.assign(filter.value.info(key), obj);
			}
		});
		update();
	}

	function clear() {
		filter.value.clear();
		update();
	}

	function update() {
		let res = filter.value.update();
		infos.value = res.infos;
		choices.value = res.choices;

		emits("update:modelValue", infos.value);
	}

	function search(reset = false) {
		update();
		emits("filter", infos.value, reset);
	}

	defineExpose({
		init,
		clear,
		onMouseover,
		onMouseleave
	});
</script>

<style lang="scss" scoped>
	.select {
		display: flex;
		align-items: center;
		line-height: 32px;
		height: 32px;
		flex-wrap: wrap;
	}

	.content {
		z-index: 101;
		background-color: #fff;
		box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
		position: fixed;
	}

	.input {
		padding: 14px;
	}

	.table_filter_checkbox {
		padding: 14px 14px 11px 14px;
	}

	.foot {
		border-top: 1px solid #dcdee2;
		text-align: center;
		padding: 14px 0;

		button {
			margin: 0 10px;
		}
	}

	.arrow {
		position: absolute;
		top: -6px;
		margin-left: 2px;

		span:after {
			display: block;
			content: " ";
			width: 0;
			height: 0;
			border-right: 6px solid transparent;
			border-left: 6px solid transparent;
			border-bottom: 6px solid #fff;
		}
	}
</style>
