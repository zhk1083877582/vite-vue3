import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule";
let userData = {};
// 姓名 手机号查询员工
function getNameOrPhone(workNo, params) {
    let data = {
        workNo,
        ...params,
    };
    return employeeMgr.getDtUserByWorkNoReturnFun(data).then((res) => {
        return (
            res &&
            res.map((item) => {
                item.key = item.userId;
                item.value = item.userName + "-" + item.workNo;
                return item;
            })
        );
    });
}
export class editOpt extends Opt {
    create() {
        let authOrgEdit = {
            title: "数据权限",
            key: "authOrg",
            visible: this.info.dataAuth == 2,
            select: {
                options: [],
                multiple: true,
                showCheckbox: true,
            },
            load: (o) => {},
            // rules: [ruleOpt.required("所属组织不能为空", "array")],
        };
        let authOrgTxt = {
            title: "数据权限",
            visible: this.info.dataAuth != 2,
            key: "dataAuthStr",
            text: {},
        };
        return [
            {
                title: "所属组织",
                key: "orgIds",
                tree: {
                    saveAll: true,
                    options: [],
                    searchBtn: true,
                },
                load: (o) => {
                    console.log("🚀 ~ addOpt ~ create ~ o:", o);
                    o.tree.options = [
                        {
                            id: "1",
                            label: "一级 1",
                            children: [
                                {
                                    id: "1-1",
                                    label: "二级 1-1",
                                    children: [
                                        {
                                            id: "1-1-1",
                                            label: "三级 1-1-1",
                                        },
                                        {
                                            id: "1-1-2",
                                            label: "三级 1-1-2",
                                        },
                                        {
                                            id: "1-1-3",
                                            label: "三级 1-1-3",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "2",
                            label: "一级 2",
                            children: [
                                {
                                    id: "2-1",
                                    label: "二级 2-1",
                                    children: [
                                        {
                                            id: "2-1-1",
                                            label: "三级 2-1-1",
                                        },
                                    ],
                                },
                            ],
                        },
                    ];
                },
            },
            {
                title: "员工",
                key: "dtUserId",
                placeholder: "请输入工号或姓名",
                select: {
                    filterable: true,
                    options: [],
                    remote: (key) => {},
                },
                change: (d) => {
                    let obj = userData.find((item) => item.userId == d.value);
                    d.info.orgCompanyId = obj.companyId;
                    d.info.companyName = obj.companyName;
                    d.info.orgDivisionId = obj.divisionId;
                    d.info.phone = obj.phone;
                    d.info.userName = obj.userName;
                    d.info.workNo = obj.workNo;
                    if (d.info.dataAuth == 3) {
                        d.info.dataAuthStr = d.info.companyName;
                    }
                },
                rules: [ruleOpt.required("员工不能为空")],
            },
            {
                title: "手机号",
                key: "phone",
                text: { tooltip: false },
            },
            {
                title: "时间",
                key: "day",
                date: { type: "daterange" },
            },
            {
                title: "所属组织",
                key: "companyName",
                text: {},
            },

            authOrgEdit,
            authOrgTxt,
            {
                title: "人员状态",
                key: "state",
                radio: {
                    options: [
                        {
                            value: "启用",
                            key: 1,
                        },
                        {
                            value: "禁用",
                            key: 0,
                        },
                    ],
                },
            },
        ];
    }
}

export class addOpt extends Opt {
    create() {
        let authOrgEdit = {
            title: "数据权限",
            key: "authOrg",
            visible: this.info.dataAuth == 2,
            select: {
                options: [],
                multiple: true,
                showCheckbox: true,
            },
            load: (o) => {},
            // rules: [ruleOpt.required("所属组织不能为空", "array")],
        };
        let authOrgTxt = {
            title: "数据权限",
            visible: this.info.dataAuth != 2,
            key: "dataAuthStr",
            text: {},
        };
        return [
            {
                title: "treeSelect",
                key: "sealId",
                col: 24,
                treeSelect: {
                    data: [],
                    multiple: true,
                },
                load: (o) => {
                    o.treeSelect.data = [
                        {
                            value: "curSeal",
                            title: "当前组织印章",
                            disabled: true,
                            expand: true,
                            children: [
                                {
                                    value: 1212,
                                    title: "111",
                                },
                                {
                                    value: 2323,
                                    title: "222",
                                },
                            ],
                        },
                        {
                            value: "otherSeal",
                            title: "其它组织印章",
                            disabled: true,
                            expand: true,
                            children: [],
                        },
                    ];
                },
                change: (val) => {
                    console.log("🚀 ~ addOpt ~ create ~ val:", val);
                    // _this.changeSeal(val);
                },
                rules: [ruleOpt.required("treeselect不能为空", "array")],
            },
            {
                title: "cascader",
                placeholder: "请选择cascader",
                key: "cascaderIds",
                cascader: {
                    filterable: true,
                    changeOnSelect: true,
                    expandTrigger: "hover",
                    multiple: true,
                    emitPath: true,
                    value: "value",
                    lable: "label",
                    chilidren: "children",
                    options: [
                        {
                            value: "1",
                            label: "一级 1",
                            children: [
                                {
                                    value: "1-1",
                                    label: "二级 1-1",
                                    children: [
                                        {
                                            value: "1-1-1",
                                            label: "三级 1-1-1",
                                        },
                                        {
                                            value: "1-1-2",
                                            label: "三级 1-1-2",
                                        },
                                        {
                                            value: "1-1-3",
                                            label: "三级 1-1-3",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            value: "2",
                            label: "一级 2",
                            children: [
                                {
                                    value: "2-1",
                                    label: "二级 2-1",
                                    children: [
                                        {
                                            value: "2-1-1",
                                            label: "三级 2-1-1",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },

            {
                title: "员工",
                key: "dtUserId",
                placeholder: "请输入工号或姓名",
                select: {
                    filterable: true,
                    options: [],
                    remote: (key) => {},
                },
                change: (d) => {
                    let obj = userData.find((item) => item.userId == d.value);
                    d.info.orgCompanyId = obj.companyId;
                    d.info.companyName = obj.companyName;
                    d.info.orgDivisionId = obj.divisionId;
                    d.info.phone = obj.phone;
                    d.info.userName = obj.userName;
                    d.info.workNo = obj.workNo;
                    if (d.info.dataAuth == 3) {
                        d.info.dataAuthStr = d.info.companyName;
                    }
                },
                rules: [ruleOpt.required("员工不能为空")],
            },
            {
                title: "日期",
                key: "day1",
                date: {
                    type: "date",
                },
                // disabled: true,
                placeholder: "日期",
                rules: [ruleOpt.required("日期不能为空", "date")],
            },
            {
                title: "时间1",
                key: "day1",
                date: { type: "daterange" },
            },
            {
                title: "时间2",
                key: "day2",
                TimePicker: {},
            },
            {
                title: "时间3",
                key: "day3",
                TimePicker: { type: "timerange" },
            },
            {
                title: "手机号",
                key: "phone",
                text: { tooltip: false },
            },
            {
                title: "所属组织",
                key: "companyName",
                text: {},
            },

            authOrgEdit,
            authOrgTxt,
            {
                title: "人员状态",
                key: "state",
                radio: {
                    options: [
                        {
                            value: "启用",
                            key: 1,
                        },
                        {
                            value: "禁用",
                            key: 0,
                        },
                    ],
                },
            },
        ];
    }
}
