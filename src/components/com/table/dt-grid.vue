<template>
	<div
		style="display: flex; margin-bottom: 10px"
		:style="{
			justifyContent: filterItems.length > 0 ? 'space-between' : 'flex-end'
		}"
	>
		<dt-filter v-if="filterItems.length > 0" v-model="filterInfo" ref="filterRef" @filter="search" :filter="filter" />
		<slot name="btn"></slot>
	</div>

	<div ref="contentRef" style="position: relative; overflow: hidden; box-sizing: content-box" :key="keyIdx">
		<dt-table ref="tableRef" v-loading="loading" :height="tableHeight" :widthWarp="tableWidth" :checkbox="checkbox" :row-class="rowClass ? rowClass : fun()" @sort="onSort" />
		<!-- <Spin fix v-show="loading">
            <Icon type="ios-loading" size="20" class="dt-loading"></Icon>
            <div>Loading</div>
        </Spin> -->
		<dt-page :page="pageOpt" @change="onPageChange" />
	</div>
</template>

<script setup>
	import dt from "@/config/dt";
	import { Filter } from "./Filter.js";
	import { nextTick, onMounted, ref, onUnmounted, watch } from "vue";
	const [tableWidth, tableHeight, keyIdx] = [ref(500), ref(500), ref(1)];
	const [tableRef, filterRef, contentRef] = [ref(), ref(), ref()];
	const props = defineProps({
		page: [Object, Number, Boolean], // number 为 rows boolean 为 是否有分页
		onFetch: Function,
		rowClass: { type: Boolean, default: false },
		height: Number,
		filter: Filter,
		checkbox: Object,
		list: Array
	});
	const filterItems = ref([]);
	const [searchInfo, filterInfo, sortInfo] = [ref({}), ref({}), ref({})];
	const loading = ref();
	const emits = defineEmits(["filter"]);
	const pageOpt = ref();
	const rowClass = row => {
		return Number(row.rowData._index_) % 2 == 0 ? "f8" : "f0";
	};
	watch(
		() => props.page,
		(n, o) => {
			if (n != o || typeof n == "object") {
				if (n) {
					if (!pageOpt.value) pageOpt.value = { rows: 50 };
					if (typeof n == "number") pageOpt.value.rows = n;
					else if (typeof n == "object") Object.assign(pageOpt.value, n);
				} else if (pageOpt.value) pageOpt.value = null;
			}
		},
		{ immediate: true, deep: true }
	);

	watch(
		() => props.list,
		(n, o) => {
			nextTick(() => tableRef.value?.loadList(n || [], false));
		},
		{ immediate: true, deep: true }
	);

	let [interval, top] = [null, 0];
	// 处理size
	function fixSize() {
		nextTick(() => {
			if (props.height) tableHeight.value = props.height;
			else tableHeight.value = Math.max(window.innerHeight - top - 120, 200);
			tableWidth.value = contentRef.value?.offsetWidth;
		});
	}

	onMounted(() => {
		fixSize();
		window.addEventListener("resize", fixSize);
		if (!props.height) {
			interval = setInterval(() => {
				if (top != contentRef.value?.getBoundingClientRect().top) {
					top = contentRef.value?.getBoundingClientRect().top;
					fixSize();
				}
			}, 200);
		}
	});

	onUnmounted(() => {
		clearInterval(interval);
		window.removeEventListener("resize", fixSize);
	});

	// 处理 Opt
	function loadOpt(Opt) {
		let opts = Opt.options();
		filterItems.value = [];
		opts.forEach(item => {
			if (item.header?.filter && (item.visible != false || item.showFilter)) {
				filterItems.value.push(item.header.filter);
				nextTick(() => (item.header.filter.node = filterRef.value));
			}
			if (item.sort?.value && item.visible != false) {
				sortInfo.value[item.sort.key || item.field] = item.sort[item.sort.value] || item.sort.value;
			}
		});
		tableRef.value.loadColumns(opts);
		if (Array.isArray(Opt.info)) {
			tableRef.value.loadList(Opt.info);
		} else if (props.list) {
			tableRef.value?.loadList(props.list);
		}
		nextTick(() => {
			filterRef.value?.init(filterItems.value);
		});
	}

	function init(Opt, filterInf) {
		keyIdx.value++;
		nextTick(() => {
			fixSize();
			filterRef.value?.clear();
			sortInfo.value = {};
			filterInfo.value = filterInf ?? {};
			loadOpt(Opt);
		});
	}

	function update(Opt) {
		if (Opt) loadOpt(Opt);
		tableRef.value?.reload();
	}

	function onSort(data) {
		sortInfo.value = data || {};
		fetch(true, true);
	}

	// 处理请求
	function fetch(reset, clear) {
		// tableRef.value.scrollTo(0, 0)
		let arr = [];
		nextTick(() => {
			if (props.onFetch) {
				loading.value = true;
				let data = {
					...searchInfo.value,
					...filterInfo.value,
					...sortInfo.value
				};
				if (pageOpt.value) {
					if (reset) pageOpt.value.current = 1;
					data.current = pageOpt.value.current;
					data.page = pageOpt.value.current;
					data.rows = pageOpt.value.rows;
				}
				props
					.onFetch(data, clear)
					.then(res => {
						if (res) {
							fixSize();
							if (Array.isArray(res)) {
								tableRef.value.loadList(res);
							} else {
								if (!res.list) res.list = [];
								if (res.list.length == 0 && pageOpt.value.current != 1) {
									data.page = pageOpt.value.current - 1;
									data.current = pageOpt.value.current - 1;
									props.onFetch(data, clear).then(res => {
										tableRef.value.loadList(res.list);
										pageOpt.value.total = Number(res.total);
									});
								} else {
									tableRef.value.loadList(res.list);
									pageOpt.value.total = Number(res.total);
								}
							}
							loading.value = false;
						} else {
							loading.value = false;
							tableRef.value.loadList(arr);
						}
					})
					.catch(err => {
						loading.value = false;
						tableRef.value.loadList(arr);
					});
			}
		});
	}

	function clear() {
		tableRef.value.loadList([]);
		if (pageOpt.value) pageOpt.value.total = 0;
	}

	// 处理 search filter page
	function search(infos, clear) {
		fixSize();
		fetch(true, clear);
		emits("filter", infos);
	}

	function updateSearchInfo(info) {
		searchInfo.value = info;
	}

	function onPageChange() {
		fetch();
	}

	function clearFilter() {
		filterRef.value?.clear();
	}

	//
	defineExpose({
		init,
		update,
		fetch,
		search,
		updateSearchInfo,
		clearFilter,
		filterInfo,
		searchInfo
	});
</script>

<style lang="scss" scoped></style>
