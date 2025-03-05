<template>
	<div class="employee-list">
		<dt-search ref="searchRef" :xl="4" :xlBtn="8">
			<el-button type="primary" style="margin-right: 8px" @click="addEmployee">添加人员</el-button>
			<el-button type="primary" style="margin-right: 8px" @click="showDtInfo">dt-info</el-button>
			<el-button type="primary" style="margin-right: 8px" @click="handelClick">click</el-button>
		</dt-search>
		<dt-grid ref="tableRef" :onFetch="onFetch" page>
			<template #btn>
				<div class="flex btn-content">
					<el-button type="primary" @click="gridBtnClickO"> gridBtn1 </el-button>
					<el-button type="primary" @click="gridBtnClickT"> gridBtn1 </el-button>
				</div>
			</template>
		</dt-grid>
		<!--新建员工-->
		<dt-modal-edit ref="editRef" :title="editTitle" @ok="onOk" :label-width="120"></dt-modal-edit>
		<dt-modal-info ref="infoRef" title="dt-info" :width="800" :labelWidth="150">
			<!-- <dt-grid ref="tableRef" :onFetch="onFetch" /> -->
		</dt-modal-info>
		<dt-preview ref="previewRef" :images="images" :showIndex="0" />
	</div>
</template>

<script setup>
	import { ref, reactive, onMounted } from "vue";
	import { addOpt, editOpt } from "./opt/edit";
	import { searchOpt } from "./opt/search";
	import { listColumn } from "./opt/columns.js";
	import dt from "@/config/dt";
	import employeeMgr from "./biz/index";
	import router from "@/router";
	import { payOpt } from "./opt/pay";

	const [tableRef, editRef, searchRef, infoRef, previewRef] = [ref(), ref(), ref(), ref(), ref()];

	let searchInfo = ref({
		orgId: "",
		roleIds: "-1",
		positionStatus: "-1",
		state: "-1",
		settlementMonth: "",
		settlementStatus: "",
		times: []
	});
	let orgCheck = reactive({
		title: "",
		id: 396
	});
	let editTitle = ref("");
	let detailInfo = ref({});
	onMounted(() => {
		searchRef.value.init(tableRef.value, new searchOpt(), searchInfo.value);
		tableRef.value.init(new listColumn(fun));
		tableRef.value.fetch();
	});

	let editInfo = ref({});
	let images = ref([]);
	const fun = {
		onEdit: row => {
			editTitle.value = "编辑员工";
			editInfo.value = dt.tool.deepClone(row);
			editInfo.value.modalType = "edit";
			editInfo.value.dataAuthStr = row.authOrgNames;
			editInfo.value.authOrg = row.authOrg;
			editInfo.value.orgCompanyId = row.orgCompanyId;
			editInfo.value.orgIds = [];
			editInfo.value.doorHeaderPhoto = [];
			editInfo.value.doorHeaderPhotoArr = [
				{
					url: "https://images.tospurfang.com/hft/fafa46b7ea0642768e2014c8018be699.jpg"
				},
				{
					url: "https://images.tospurfang.com/hft/7a8703795cf541f989e24a27b10a899b.jpg"
				}
			];
			editRef.value.show(new editOpt({}, editInfo.value), editInfo.value);
		},
		onChangeStatus: row => {
			dt.ui
				.messageBox({
					title: `${row.state == "1" ? "禁用" : "启用"}`,
					message: `请确认,是否将员工设为${row.state == "1" ? "禁用" : "启用"}`
				})
				.then(() => {
					employeeMgr
						.disableUsers({
							userIds: [row.id],
							state: row.state == "1" ? 0 : 1
						})
						.then(res => {
							dt.ui.Message.success(`员工（${row.userName}）已被${row.state == "1" ? "禁用" : "启用"}`);
							onSearch();
						});
				});
		},
		preview: src => {
			images.value = [src];
			previewRef.value.show();
		}
	};

	function onFetch(data) {
		let params = {
			...data,
			positionStatus: data.positionStatus == "-1" ? "" : data.positionStatus,
			state: data.state == "-1" ? "" : data.state,
			roleIds: data.roleIds == "-1" ? [] : data.roleIds.split(","),
			orgId: data.orgId == "-1" ? "" : data.orgId
		};
		console.log("🚀 ~ onFetch ~ params:", params);

		return employeeMgr.getUserListFun(params).then(res => {
			console.log("🚀 ~ returnemployeeMgr.getUserListFun ~ res:", res.list.length);
			return res;
		});
	}

	function onSearch() {
		tableRef.value.fetch();
	}

	function addEmployee() {
		editTitle.value = "新建员工";
		editInfo.value = { state: 1 };
		editInfo.value.modalType = "add";
		editInfo.value.day1 = null;
		editInfo.value.orgIds = [];
		editRef.value.show(new addOpt({}, editInfo.value), editInfo.value);
	}

	function onOk(data) {
		console.log("🚀 ~ onOk ~ data:", data);
	}
	const funpay = {};
	function showDtInfo() {
		infoRef.value.show(new payOpt(funpay), detailInfo.value);
		console.log("🚀 ~ showDtInfo ~ infoRef.value:", infoRef.value);
	}
	function handelClick() {
		dt.ui.Message.success({ msg: "1111" });
	}
	function gridBtnClickO() {
		console.log("🚀 ~ gridBtnClickO ~ gridBtnClickO:");
	}
	function gridBtnClickT() {
		console.log("🚀 ~ gridBtnClickT ~ gridBtnClickT:");
	}
</script>

<style scoped lang="scss"></style>
