import { Opt } from "@/components/com/Opt.js";
import dateOpt from "@/option/date.js";
export class listOpt extends Opt {
    constructor(vm) {
        super(vm);
    }
    create() {
        return [
            {
                type: "checkbox",
                title: "",
                fixed: "left",
            },
            {
                title: "创建人",
                field: "createUserName",
                minWidth: 120,
                cell: (item) => {
                    return {
                        edit: {
                            key: "createUserName",
                            placeholder: "请输入创建人",
                            input: {
                                // type: "number",
                                // precision: 2,
                                blur: (val) => {
                                    console.log(
                                        "🚀 ~ listOpt ~ create ~ val:",
                                        item,
                                        val
                                    );
                                    // this.onBlur(item);
                                },
                            },
                        },
                    };
                },
            },
            {
                title: "创建时间",
                field: "createTime",
                minWidth: 160,
                cell: (item) => {
                    return {
                        edit: {
                            key: "createTime",
                            placeholder: "请选择日期和时间",
                            date: {
                                type: "datetime",
                                valueFormat: "YYYY-MM-DD HH:mm:ss",
                                clearable: false,
                                change: (val) => {
                                    console.log(
                                        "🚀 ~ listOpt ~ create ~ val:",
                                        item,
                                        val
                                    );
                                    // this.onBlur(item);
                                },
                            },
                        },
                    };
                },
                header: {
                    filter: dateOpt.range({
                        title: "创建时间",
                        startKey: "startTime",
                        endKey: "endTime",
                    }),
                },
            },
            {
                title: "海报状态",
                field: "delFlag",
                minWidth: 100,
                cell: (item) => {
                    return {
                        edit: {
                            key: "delFlag",
                            placeholder: "请选择海报状态",
                            select: {
                                teleported: true,
                                options: [
                                    { key: false, value: "正常" },
                                    { key: true, value: "已删除" },
                                ],
                            },
                            change: (val) => {
                                item.delFlagName =
                                    val.value == "false" ? "正常" : "已删除";
                                console.log(
                                    "🚀 ~ listOpt ~ create ~ val:",
                                    item.delFlagName,
                                    val
                                );
                            },
                        },
                    };
                },
                header: {
                    filter: {
                        title: "海报状态",
                        key: "delFlag",
                        placeholder: "请选择",
                        select: {
                            options: [
                                { key: false, value: "正常" },
                                { key: true, value: "已删除" },
                            ],
                        },
                    },
                },
            },
            {
                field: "auditName",
                title: "操作",
                fixed: "right",
                width: 120,
                cell: (info) => {
                    console.log("🚀 ~ listOpt ~ create ~ info:", info);
                    return {
                        btn: [
                            {
                                title: "查看",
                                click: (d) => {
                                    this.toDetail(d);
                                },
                            },
                            {
                                title:
                                    info.delFlagName == "正常"
                                        ? "删除海报"
                                        : "",
                                // code: '0104020000',
                                click: (d) => {
                                    this.delFun(d);
                                },
                            },
                        ],
                    };
                },
            },
        ];
    }
}
