<!-- 员工管理 -->
<template>
    <div class="employee-list">
        <dt-search ref="searchRef" :xl="6" :xlBtn="6">
            <el-button
                type="primary"
                style="margin-right: 8px"
                @click="addEmployee"
                >添加人员</el-button
            >
        </dt-search>
        <dt-grid ref="tableRef" :onFetch="onFetch" page />
        <!--新建员工-->
        <dt-modal-edit
            ref="editRef"
            :title="editTitle"
            @ok="onOk"
            :label-width="120"
        ></dt-modal-edit>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { addOpt, editOpt } from "./biz/edit";
import { searchOpt } from "./biz/search";
import { listColumn } from "./biz/columns.js";
import dt from "@/config/dt";
import employeeMgr from "./biz/index";
import router from "@/router";

const [tableRef, editRef, searchRef] = [ref(), ref(), ref()];

let searchInfo = ref({
    orgId: "-1",
    roleIds: "-1",
    positionStatus: "-1",
    state: "-1",
    settlementMonth: "",
    settlementStatus: "",
});
let orgCheck = reactive({
    title: "",
    id: 396,
});
let editTitle = ref("");
onMounted(() => {
    searchRef.value.init(tableRef.value, new searchOpt(), searchInfo.value);
    tableRef.value.init(new listColumn(fun));
    tableRef.value.fetch();
});

let editInfo = ref({});

const fun = {
    onEdit: (row) => {
        editTitle.value = "编辑员工";
        editInfo.value = dt.tool.deepClone(row);
        editInfo.value.modalType = "edit";
        editInfo.value.dataAuthStr = row.authOrgNames;
        editInfo.value.authOrg = row.authOrg;
        editInfo.value.orgCompanyId = row.orgCompanyId;
        editRef.value.show(new editOpt({}, editInfo.value), editInfo.value);
    },
    onChangeStatus: (row) => {
        dt.ui.Modal.confirm({
            title: `${row.state == "1" ? "禁用" : "启用"}`,
            content: `请确认,是否将员工设为${
                row.state == "1" ? "禁用" : "启用"
            }`,
            onOk: () => {
                employeeMgr
                    .disableUsers({
                        userIds: [row.id],
                        state: row.state == "1" ? 0 : 1,
                    })
                    .then((res) => {
                        dt.ui.Message.success(
                            `员工（${row.userName}）已被${
                                row.state == "1" ? "禁用" : "启用"
                            }`
                        );
                        onSearch();
                    });
            },
        });
    },
};

function onFetch(data) {
    let params = {
        ...data,
        positionStatus: data.positionStatus == "-1" ? "" : data.positionStatus,
        state: data.state == "-1" ? "" : data.state,
        roleIds: data.roleIds == "-1" ? [] : data.roleIds.split(","),
        orgId: data.orgId == "-1" ? "" : data.orgId,
    };
    console.log("🚀 ~ onFetch ~ params:", params);

    return employeeMgr.getUserListFun(params).then((res) => {
        console.log(
            "🚀 ~ returnemployeeMgr.getUserListFun ~ res:",
            res.list.length
        );
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
    editRef.value.show(new addOpt({}, editInfo.value), editInfo.value);
}

function onOk(data) {
    let authOrg =
        data.dataAuth == 2
            ? data.authOrg.join(",")
            : data.dataAuth == 3
            ? data.orgCompanyId
            : null;
    let params = {
        ...data,
        roleIds: data.roleIds.split(","),
        authOrg,
    };
    employeeMgr.userFun(params).then((res) => {
        if (params.modalType == "edit") {
            dt.ui.Message.success("编辑人员成功");
        } else {
            dt.ui.Message.success("新增人员成功");
        }
        editRef.value.hide();
        onSearch();
    });
}
</script>

<style scoped lang="scss"></style>
