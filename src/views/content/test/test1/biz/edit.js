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
