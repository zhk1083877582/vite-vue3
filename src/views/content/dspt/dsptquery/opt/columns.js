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
            },
            {
                title: "创建时间",
                field: "createTime",
                minWidth: 160,
                cell: {
                    text: {},
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
                field: "delFlagName",
                minWidth: 100,
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
