<!-- 已报案查询 -->
<template>
	<div class="employee-list">
		<dt-search ref="searchRef" :xl="6" :xlBtn="6"></dt-search>
		<dt-grid ref="tableRef" :onFetch="onFetch" page> </dt-grid>
		<!--新建员工-->
		<dt-modal-edit ref="editRef" :title="editTitle" @ok="onOk" :label-width="120"></dt-modal-edit>
		<dt-modal-info ref="infoRef" title="dt-info" :width="800" :labelWidth="150">
			<!-- <dt-grid ref="tableRef" :onFetch="onFetch" /> -->
		</dt-modal-info>
		<dt-org-modal ref="orgModalRef" @selectOrg="getOrglist" />
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import moment from "moment";
	import { addOpt, editOpt } from "./opt/edit";
	import { searchOpt } from "./opt/search";
	import { listColumn } from "./opt/columns.js";
	import dt from "@/config/dt";
	import employeeMgr from "./biz/index";
	import { payOpt } from "./opt/pay";

	const [tableRef, editRef, searchRef, infoRef, orgModalRef] = [ref(), ref(), ref(), ref(), ref()];
	let orglist = ref([]);
	let searchInfo = ref({
		orgId: "",
		roleIds: "-1",
		positionStatus: "-1",
		state: "-1",
		settlementMonth: "",
		settlementStatus: "",
		dateTime1: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
		dateTime2: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
	});

	let editTitle = ref("");
	let detailInfo = ref({});
	const searchFun = {
		showOrgModal: () => {
			orgModalRef.value.show();
		},
		getOrglist: () => {
			return orglist.value;
		}
	};
	onMounted(() => {
		searchRef.value.init(tableRef.value, new searchOpt(searchFun), searchInfo.value);
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
			...data
		};

		return employeeMgr.getUserListFun(params).then(res => {
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
	function getOrglist(data) {
		let list = [{ key: data.id, value: data.name }];
		orglist.value = list;
		nextTick(() => {
			searchInfo.value.orgId = data.id;
			searchRef.value.update(new searchOpt(searchFun), searchInfo.value);
		});
	}
</script>

<style scoped lang="scss"></style>
