import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule.js";

export class editOpt extends Opt {
    constructor() {
        super();
    }

    create() {
        return [
            [
                {
                    title: "number格式",
                    key: "number1",
                    labelWidth: "150",
                    text: {
                        type: "number",
                        tooltip: true,
                        color: "red",
                        tipsTxt: `asdasdasdasd`,
                    },
                },
                {
                    title: "date格式",
                    key: "date1",
                    text: {
                        type: "date",
                        tooltip: true,
                        color: "red",
                        tipsTxt: `asdasdasdasd`,
                    },
                },
            ],

            {
                title: "菜单名称",
                key: "title",
                input: {
                    maxlength: 20,
                    suffixIcon: "Calendar",
                    prefixIcon: "Search",
                    // prependTxt: "123",
                    // appendTxt: "456",
                },
                placeholder: "请输入菜单名称",
                rules: [ruleOpt.required("菜单名称不能为空")],
            },
            [
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
                    title: "日期2",
                    key: "day2",
                    date: {
                        type: "daterange",
                    },
                    // disabled: true,
                    placeholder: "日期",
                    rules: [ruleOpt.required("日期不能为空", "array")],
                },
            ],
            [
                {
                    title: "日期3",
                    key: "day3",
                    date: {
                        type: "datetimerange",
                        valueFormat: "YYYY-MM-DD HH:mm:ss",
                    },
                    // disabled: true,
                    placeholder: "日期",
                    rules: [ruleOpt.required("日期不能为空", "array")],
                },
                {
                    title: "时间",
                    key: "date3",
                    TimePicker: {
                        type: "timerange",
                        // focus: (val, option) => {
                        //     console.log(
                        //         "🚀 ~ editOpt ~ create ~ val, option:",
                        //         val,
                        //         option
                        //     );
                        // },
                    },
                    // disabled: true,

                    placeholder: "时间",
                    rules: [ruleOpt.required("时间不能为空", "array")],
                },
            ],

            [
                {
                    title: "select1",
                    key: "select1",
                    placeholder: "select1",
                    select: {
                        options: [],
                        multiple: true,
                        maxTagCount: 2,
                    },
                    load: (o) => {
                        o.select.options = [
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                        ];
                    },
                    rules: [ruleOpt.required("select1不能为空", "array")],
                },
                {
                    title: "select2",
                    key: "select2",
                    placeholder: "select2",
                    select: {
                        options: [],
                        multiple: false,
                        clearable: true,
                    },
                    load: (o) => {
                        o.select.options = [
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                        ];
                    },
                    rules: [ruleOpt.required("select2不能为空")],
                },
            ],
            [
                {
                    title: "radio1",
                    key: "radio1",
                    radio: {
                        options: [
                            {
                                value: "入口",
                                key: 1,
                            },
                            {
                                value: "按钮",
                                key: 2,
                            },
                        ],
                    },
                    rules: [ruleOpt.required("radio1", "number")],
                },
                {
                    title: "checkBox",
                    key: "checkBox1",
                    disabled: false,
                    checkbox: {
                        options: [],
                    },
                    load: (o) => {
                        o.checkbox.options = [
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                        ];
                    },
                    rules: [
                        {
                            type: "array",
                            required: true,
                            message: "checkBox1不能为空",
                            trigger: "blur,change",
                        },
                    ],
                },
            ],
            {
                title: "button1",
                key: "button1",
                // visible: false,
                group: [
                    {
                        button: {
                            title: "button1",
                            type: "primary",
                            click: () => {
                                console.log(
                                    "🚀 ~ editOpt ~ create ~ click: button1"
                                );
                            },
                        },
                    },
                    {
                        button: {
                            title: "button2",
                            type: "success",
                            click: () => {
                                console.log(
                                    "🚀 ~ editOpt ~ create ~ click: button1"
                                );
                            },
                        },
                    },
                    {
                        button: {
                            title: "button3",
                            type: "warning",
                            click: () => {
                                console.log(
                                    "🚀 ~ editOpt ~ create ~ click: button1"
                                );
                            },
                        },
                    },
                    {
                        button: {
                            title: "button4",
                            type: "danger",
                            click: () => {
                                console.log(
                                    "🚀 ~ editOpt ~ create ~ click: button1"
                                );
                            },
                        },
                    },
                    {
                        button: {
                            title: "button5",
                            type: "info",
                            click: () => {
                                console.log(
                                    "🚀 ~ editOpt ~ create ~ click: button1"
                                );
                            },
                        },
                    },
                    // {
                    //     button: {
                    //         title: "button6",
                    //         type: "text",
                    //         click: () => {
                    //             console.log(
                    //                 "🚀 ~ editOpt ~ create ~ click: button1"
                    //             );
                    //         },
                    //     },
                    // },
                ],
            },
            {
                title: "tag1",
                key: "tag1",
                // visible: false, //垫付
                tag: {
                    closable: false,
                    options: [
                        { key: "1", value: "1" },
                        { key: "2", value: "2" },
                    ],
                    click: (tag) => {
                        console.log("🚀 ~ editOpt ~ create ~ tag:", tag);
                    },
                },
            },
            {
                title: "cascader",
                placeholder: "请选择cascader",
                key: "cascaderIds",
                cascader: {
                    filterable: true,
                    changeOnSelect: true,
                    expandTrigger: "hover",
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
                title: "switch1",
                key: "switch1",
                switch: {
                    // openText: "上传",
                    // closeText: "后补",
                    size: "large",
                },
                tips: "switch1",
                change: (v) => {
                    console.log("🚀 ~ editOpt ~ create ~ v:", v);
                },
            },
            {
                title: "dt-time",
                key: "dtTime",
                dtTime: {
                    dateType: "month",
                    dateFormat: "YYYY-MM",
                    transfer: false,
                    clearable: true,
                },
                rules: [
                    ruleOpt.timeInterval(2),
                    ruleOpt.check("不支持选择单边日期", (value) => {
                        return (value[0] == "") ^ (value[1] == "");
                    }),
                ],
            },
        ];
    }
}
