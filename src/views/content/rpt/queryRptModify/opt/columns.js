import { Opt } from "@/components/com/Opt.js";

export class listColumn extends Opt {
    constructor(fun) {
        super(fun);
    }
    create() {
        return [
            {
                title: "序号",
                minWidth: 50,
                type: "index",
                fixed: "left",
            },
            {
                field: "orgName",
                title: "所属组织",
                minWidth: 150,
                header: {
                    filter: {
                        title: "所属组织",
                        key: "orgName",
                        placeholder: "请输入角色名称",
                        input: {},
                    },
                },
            },
            {
                field: "workNo",
                title: "工号",
                minWidth: 90,
                header: {
                    filter: {
                        title: "工号",
                        key: "workNo",
                        placeholder: "请输入工号",
                        select: {
                            options: [
                                { key: "123", value: "工号1" },
                                { key: "456", value: "工号2" },
                            ],
                        },
                    },
                },
            },
            {
                field: "userName",
                title: "姓名",
                minWidth: 100,
            },
            {
                field: "phone",
                title: "手机号",
                minWidth: 120,
            },
            {
                field: "roleNames",
                title: "角色",
                minWidth: 110,
                // header: {
                //     filter: {
                //         title: "角色类型",
                //         key: "roleType",
                //         placeholder: "请选择角色类型",
                //         select: {
                //             options: [
                //                 {
                //                     value: "门店角色",
                //                     key: 1,
                //                 },
                //                 {
                //                     value: "渠道角色",
                //                     key: 2,
                //                 },
                //             ],
                //         },
                //     },
                // },
            },
            {
                field: "authOrgNames",
                title: "数据权限",
                minWidth: 220,
            },
            {
                field: "positionStatus",
                title: "职位状态",
                minWidth: 90,
                cell: (info) => {
                    return {
                        value: (v) => {
                            return info.positionStatus == 1 ? "在职" : "离职";
                        },
                        text: {
                            tooltip: false,
                        },
                    };
                },
            },
            {
                field: "state",
                title: "人员状态",
                minWidth: 90,
                cell: (info) => {
                    return {
                        value: (v) => {
                            return info.state == 1 ? "启用" : "禁用";
                        },
                        text: {},
                    };
                },
            },
            {
                field: "operate",
                title: "操作",
                fixed: "right",
                minWidth: 100,
                cell: (info) => {
                    return {
                        btn: [
                            {
                                title: "编辑",
                                color: "#3366FF",
                                click: (row) => {
                                    this.onEdit(row);
                                },
                            },
                            {
                                title: info.state == 1 ? "禁用" : "启用",
                                color: info.state == 1 ? "#F33C3C" : "#19BE6B",
                                click: (row) => {
                                    this.onChangeStatus(row);
                                },
                            },
                        ],
                    };
                },
            },
        ];
    }
}
