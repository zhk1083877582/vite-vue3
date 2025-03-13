<template>
	<div>
		<el-button @click="handelClick">messageBox</el-button>
		<el-button @click="onFieldSort">排序</el-button>
		<el-icon>
			<Search />
		</el-icon>
		<dt-grid ref="tableRef" :onFetch="onFetch" :checkbox="checkbox" page> </dt-grid>
		<dt-preview ref="previewRef" :images="preview.images" :showIndex="preview.showIndex" />
		<dt-sort-header ref="sortRef" @success="onSortSuccess" />
		<dt-modal-edit ref="editRef" @ok="onOk" :label-width="120"></dt-modal-edit>
	</div>
</template>

<script setup>
	import dt from "@/config/dt";
	import { listOpt } from "./opt/columns.js";
	import apiMgr from "./biz/index.js";
	import router from "@/router";

	const [tableRef, previewRef, sortRef, editRef] = [ref(), ref(), ref(), ref()];
	let [preview, listData] = [ref({ images: [], showIndex: 0 }), ref()];
	let checkRow = ref();
	const checkbox = {
		// isDisabled: row => {
		// 	if (!row) return false;
		// 	return row?.id != "84";
		// },
		onOne: (row, flag) => {
			console.log("🚀 ~ row, flag:", row, flag);
			checkRow.value = row;
		},
		onAll: flag => {
			console.log("🚀 ~ flag:", flag);
		},
		radio: true
	};
	const handelClick = () => {
		router.goRoot("claimsCenter/dispatchCenter/dsptquery/detail", { id: "111" });
		// router.goRoot({
		// 	path: "/index/dspt/dsptquery/detail",
		// 	query: {
		// 		id: "111"
		// 	}
		// });
		// dt.ui
		// 	.messageBox({
		// 		title: "123",
		// 		message: "sadasdas",
		// 		showCancelButton: true,
		// 		confirmButtonText: "确2定11",
		// 		cancelButtonText: "取消222",
		// 		type: "warning"
		// 	})
		// 	.then(res => {
		// 		console.log("🚀 ~ handelClick ~ res:", res);
		// 	})
		// 	.catch(close => {
		// 		console.log("🚀 ~ handelClick ~ close:", close);
		// 	});
		// console.log("🚀 ~ index.vue:56 ~ handelClick ~ handelClick:", checkRow.value);
	};

	const fn = {
		toDetail: data => {
			let index = listData.value.findIndex(item => item.id == data.id);
			onPreview(index);
		},
		delFun: data => {
			// removeFun(data);
		}
	};
	onMounted(() => {
		tableRef.value.init(new listOpt(fn));
		tableRef.value.fetch(true);
	});
	function onFetch(obj) {
		return apiMgr
			.getData()
			.then(res => {
				console.log("🚀 ~ .then ~ res:", res);
				listData.value = res.list;
				return res;
			})
			.catch(() => {
				totalNum.value = 0;
			});
	}
	function onPreview(index) {
		preview.value.images = listData.value.map(item => item.originalUrl);
		preview.value.showIndex = index;
		nextTick(() => {
			previewRef.value.show(true);
		});
	}

	function onFieldSort() {
		sortRef.value.show({
			unselected: [],
			selected: [
				{ fieldValue: "创建人", fieldId: "createUserName", disabled: false },
				{ fieldValue: "创建时间", fieldId: "createTime", disabled: false },
				{ fieldValue: "海报状态", fieldId: "delFlag", disabled: false }
			],
			title: "调整表头显示字段及排序",
			tips: "调整表头显示字段及排序tips"
			// 您可将需在“列表”中显示的字段添加至界面右侧，并通过点击上下箭头的方式，调整字段在“列表”中的显示位置
		});
	}
	function onSortSuccess(data) {
		console.log("🚀 ~ index.vue:94 ~ onSortSuccess ~ data:", data);
	}
	function onOk() {
		console.log("🚀 ~ index.vue:101 ~ onOk ~ onOk:");
	}
</script>

<style lang="scss" scoped></style>
