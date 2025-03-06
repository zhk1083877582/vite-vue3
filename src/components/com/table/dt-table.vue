<template>
	<div v-if="columns" :style="{ height: height + 'px' }">
		<el-auto-resizer>
			<template #default="{ height, width }">
				<el-table-v2
					ref="tableRef"
					:columns="columns"
					:data="data"
					:width="width"
					:height="height"
					:row-class="rowClass"
					v-model:sort-state="sortState"
					@column-sort="onSort"
					:expand-column-key="treeKey"
					:header-height="headerGroups.length ? 96 : 48"
					fixed
				>
					<template #empty style="height: 100%">
						<div style="display: flex; justify-content: center; height: 100%">
							<el-empty description="暂无数据" />
						</div>
					</template>
					<template #header="props">
						<customized-header v-bind="props" />
					</template>
				</el-table-v2>
			</template>
		</el-auto-resizer>
	</div>
</template>

<script setup>
	import render from "./render.jsx";
	import textMgr from "../info/text.js";
	import { nextTick, reactive, ref, watch } from "vue";
	import dt from "@/config/dt";

	const emits = defineEmits(["sort"]);
	const props = defineProps({
		height: Number,
		widthWarp: Number,
		rowClass: Function,
		checkbox: Object
	});
	const tableRef = ref();
	const [columns, data] = [ref(), ref([])];
	let originalData = null;

	let textItems = [];
	const [headerGroups] = [ref([])];
	const [treeKey] = [ref()];

	const CustomizedHeader = ({ cells, columns }) => {
		if (!headerGroups.value.length) return cells;
		let groupCells = [];
		let [title, width, tmpCells] = ["", 0, []];
		columns.forEach((column, idx) => {
			if (column._header_group_title) {
				if (title != column._header_group_title) {
					title = column._header_group_title;
					width = 0;
					tmpCells = [];
				}
				width += column.width;
				tmpCells.push(cells[idx]);
				if (idx == columns.length - 1 || columns[idx + 1]._header_group_title != title) {
					groupCells.push(render.header.group(title, width, tmpCells));
				}
			} else {
				groupCells.push(render.header.group("", column.width, [cells[idx]]));
			}
		});
		return groupCells;
	};

	let [checkboxKey, checkboxChoices, checkboxUnChoices] = [null, [], []];
	const checkbox = reactive({
		value: false,
		indeterminate: false,
		radio: props.checkbox?.radio,
		click: row => {
			if (row) {
				if (props.checkbox?.radio && !row[checkboxKey]) {
					choiceCheckboxAll(false);
				}
				row[checkboxKey] = !row[checkboxKey];
				props.checkbox?.onOne && props.checkbox.onOne(row, row[checkboxKey]);
			} else {
				choiceCheckboxAll(!checkbox.value);
				props.checkbox?.onAll && props.checkbox.onAll(!checkbox.value);
			}
			nextTick(() => props.checkbox?.onChange && props.checkbox.onChange(checkboxChoices, checkboxUnChoices));
		},
		disabled: row => {
			if (row) {
				row._checkbox_disabled = props.checkbox?.isDisabled ? props.checkbox.isDisabled(row) : false;
				return row._checkbox_disabled;
			} else {
				return props.checkbox?.radio ? true : props.checkbox?.isDisabled ? props.checkbox.isDisabled() : false;
			}
		}
	});

	let widthInfo = {};

	function handleWidth(column) {
		if (column.type == "checkbox" || column.type == "index") column.width = column.width ?? 50;
		if (column.width) widthInfo.fixed += column.width;
		else {
			if (column.minWidth) widthInfo.min += Number(column.minWidth);
			column.width = Number(column.minWidth ?? column.maxWidth ?? 50);
			widthInfo[column.maxWidth ? "maxItems" : "minItems"].push(column);
		}
	}

	function handleTxt(column) {
		if (column.dataKey.indexOf("_txt_") < 0) column.dataKey = "_txt_" + column.dataKey;
		return column;
	}

	// sort
	const sortState = ref({});
	function onSort(res) {
		sortState.value[res.key] = res.order;
		Object.keys(sortState.value).forEach(key => (sortState.value[key] = key == res.key ? res.order : "asc"));
		let info = {};
		info[res.column.sort.key ?? res.key] = res.column.sort[res.order] ?? res.order;
		emits("sort", info);
	}

	function handleColumn(column) {
		if (column.type == "checkbox") {
			column.title = "";
			column.field = column.field ?? "checkbox";
		} else if (column.type == "index") {
			column.title = column.title ?? "序号";
			column.field = "_index_";
		}
		column.key = column.dataKey = column.field;
		column.hidden = column.visible == false;
		if (column.sort) {
			column.sortable = true;
			sortState.value[column.key] = column.sort.value ?? "asc";
		}
		if (!column.hidden) {
			handleWidth(column);
			if (column.type == "checkbox") {
				checkboxKey = column.key = column.dataKey = column.field = column.field ?? "_checkbox";
				column.header = column.cell = { checkbox };
			} else if (column.type == "tree") {
				treeKey.value = column.key = column.dataKey = column.field = column.field ?? "_tree";
			} else if (!column.cell) {
				column.cell = { text: {} };
			}
			if (column.cell) {
				if (column.cell.text && !textMgr.hasStyle(column.cell.text) && column.field) {
					textItems.push(handleTxt(column));
				} else {
					column.cellRenderer = ({ rowData }) => {
						let opt = typeof column.cell == "function" ? column.cell(rowData) : column.cell;
						if (opt.text) {
							opt.text.max = column.width / 18.75;
						}
						return render.option(opt, column.field, rowData);
					};
				}
			}
			if (column.header) {
				column.headerCellRenderer = () => {
					let opt = typeof column.header == "function" ? column.header() : column.header;
					return render.option(opt, column.field);
				};
			}
		}
		return column;
	}

	function fixWidth() {
		let rest = props.widthWarp - widthInfo.fixed;
		if (rest - widthInfo.min > 0) {
			let minL = widthInfo.minItems.length;
			let maxL = widthInfo.maxItems.length;
			let avg = rest / (minL + maxL);
			rest = 0;
			widthInfo.maxItems.forEach(item => {
				if (item.maxWidth >= avg) {
					item.width = avg;
				} else {
					item.width = Number(item.maxWidth);
					rest += avg - item.maxWidth;
				}
			});
			avg = avg + rest / minL;
			widthInfo.minItems.forEach(item => (item.width = Math.max(Number(item.minWidth), avg)));
		}
	}

	function loadColumns(cols) {
		if (cols) {
			textItems = []; // 使用默认 text， 不使用 dt-info-edit-text
			widthInfo = {
				fixed: 0, // 所有width之和
				min: 0, // 所有最小值之和
				maxItems: [], // 所有最大项
				minItems: [] // 所有最小项
			};
			headerGroups.value = [];
			let arr = [];
			cols.forEach(itm => {
				if (itm.children) {
					headerGroups.value.push(itm.title);
					itm.children.forEach(i => {
						i._header_group_title = itm.title;
						arr.push(handleColumn(i));
					});
				} else {
					arr.push(handleColumn(itm));
				}
			});
			columns.value = arr;
			fixWidth();
			reload();
		}
	}

	// 处理列表数据
	function handleTxtData(item) {
		if (treeKey.value && item.children) {
			item.children.forEach(itm => handleTxtData(itm));
		}
		textItems.forEach(opt => {
			let val = opt.cell?.value ? opt.cell.value(item) : dt.tool.getVal(item, opt.field);
			item[opt.dataKey] = textMgr.handle(opt.cell.text, val);
		});
	}

	function loadList(list, reset = true) {
		if (reset) tableRef.value?.scrollTo({ scrollLeft: 0, scrollTop: 0 });
		originalData = list;
		data.value = list.map((item, index) => {
			choiceCheckbox(item);
			handleTxtData(item);
			item._index_ = index + 1;
			return item;
		});
	}

	function reload() {
		if (originalData) loadList(originalData);
	}

	// 处理 checkbox
	function choiceCheckbox(item, val) {
		if (checkboxKey) {
			if (val != null) {
				if (!item._checkbox_disabled) {
					item[checkboxKey] = val;
				}
			} else if (item[checkboxKey] == null) {
				// 初始化
				let choice = props.checkbox?.choice;
				item[checkboxKey] = choice ? (choice.all ? true : choice.values?.indexOf(item[choice.key]) > -1) : false;
				item._checkbox_disabled = props.checkbox?.isDisabled ? props.checkbox.isDisabled(item) : false;
			}
		}
	}

	function choiceCheckboxAll(val) {
		data.value.forEach(item => choiceCheckbox(item, val));
	}

	function checkCheckbox() {
		if (checkboxKey) {
			let [isAll, has] = [true, false];
			let indeterminate = false;
			let [choices, unChoices] = [[], []];
			data.value.forEach(item => {
				if (item[checkboxKey]) {
					has = true;
					choices.push(item);
					indeterminate = !isAll;
				} else {
					unChoices.push(item);
					if (!item._checkbox_disabled) {
						isAll = false;
						indeterminate = has;
					}
				}
			});
			checkboxChoices = choices;
			checkboxUnChoices = unChoices;
			checkbox.value = isAll;
			checkbox.indeterminate = indeterminate;
		}
	}

	watch(
		data,
		n => {
			checkCheckbox();
			n.forEach(item => handleTxtData(item));
		},
		{ deep: true }
	);
	watch(
		() => props.widthWarp,
		() => {
			fixWidth();
		}
	);
	defineExpose({
		loadColumns,
		loadList,
		reload
	});
</script>

<style lang="scss" scoped>
	:deep(.el-table-v2__empty) {
		height: 100%;
	}
</style>
