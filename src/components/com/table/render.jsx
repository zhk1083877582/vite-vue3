import dt from "@/config/dt";
import { h } from "vue";
import { ElIcon } from "element-plus";
import { ArrowDownBold } from "@element-plus/icons-vue"; // 确保从正确的位置导入图标

function arrow(opt) {
    let filter = opt.node;
    return [
        h("div", [
            h("span", opt.title),
            h(
                ElIcon,
                {
                    style: {
                        marginLeft: "5px",
                        display: "inline-block",
                    },
                    onMouseover: (e) => {
                        filter.onMouseover(e, opt);
                    },
                    onMouseleave: (e) => {
                        filter.onMouseleave(e);
                    },
                },
                {
                    default: () => h(ArrowDownBold), // 使用具体的图标组件
                }
            ),
        ]),
    ];
    // return [
    //     h("div", [
    //         h("span", opt.title),
    //         h("i", {
    //             class: "iconfont yongjin",
    //             style: {
    //                 marginLeft: "5px",
    //             },
    //             onMouseover: (e) => {
    //                 filter.onMouseover(e, opt);
    //             },
    //             onMouseleave: (e) => {
    //                 filter.onMouseleave(e);
    //             },
    //         }),
    //     ]),
    // ];
}

function hGroup(title, width, cells) {
    return (
        <div style={{ width: `${width}px`, textAlign: "center" }}>
            {title && (
                <div
                    class={"dt-table-header-title"}
                    style={{ lineHeight: "48px" }}
                >
                    {title}
                </div>
            )}
            <div style={{ display: "flex", height: `${title ? 48 : 96}px` }}>
                {cells}
            </div>
        </div>
    );
}

function checkbox(opt, field, row) {
    if (field && row) {
        return (
            <el-check-box
                v-model={row[field]}
                style={{ marginLeft: "10px" }}
                onClick={() => opt.click(row)}
                disabled={opt.disabled ? opt.disabled(row) : false}
            />
        );
    } else {
        return (
            <el-check-box
                v-model={opt.value}
                indeterminate={opt.indeterminate}
                style={{ marginLeft: "10px" }}
                onClick={() => opt.click()}
                disabled={opt.disabled ? opt.disabled() : false}
            />
        );
    }
}

function btn(opt) {
    return [
        h(
            "span",
            {
                style: {
                    color: opt.color || "#3366ff",
                    cursor: "pointer",
                    marginRight: opt.title ? "8px" : "",
                },
                onClick: (e) => {
                    if (opt.click) {
                        opt.click(opt.data);
                    }
                },
            },
            opt.title
        ),
    ];
}

// 新增icon
function icon(opts) {
    let bs = [];
    opts.forEach((opt) => {
        bs.push(
            h(
                "icon",
                {
                    class: "ivu-icon-" + opt.type,
                    style: opt.style,
                    onClick: (e) => {
                        if (opt.click) {
                            opt.click(opt.data);
                        }
                    },
                },
                opt.title
            )
        );
    });
    return bs;
}

function btns(opts) {
    let bs = [];
    opts.forEach((opt) => {
        bs.push(
            h(
                "span",
                {
                    style: {
                        color: opt.color || "#3366ff",
                        cursor: "pointer",
                        marginRight: opt.title ? "8px" : "",
                    },
                    onClick: (e) => {
                        if (opt.click) {
                            opt.click(opt.data);
                        }
                    },
                },
                opt.title
            )
        );
    });
    return bs;
}

function text(opt = {}) {
    return <dt-info-edit-text option={opt} value={opt.value} />;
}

function edit(option, info) {
    return <dt-info-edit option={option} info={info} />;
}

function group(option, info) {
    return [
        h("dt-info-edit-group", {
            props: {
                option: {
                    group: option,
                },
                info,
            },
        }),
    ];
}

function input(opt) {
    return [
        h("el-input", {
            props: {
                value: opt.data[opt.key],
                type: opt.type || "text",
                placeholder: opt.placeholder || "请输入",
                disabled: opt.disabled || false,
            },
            style: {
                width: opt.width || null,
            },
            // ～～～
            on: {
                input: (e) => {
                    opt.data[opt.key] = e;
                },
                "on-blur": () => {
                    if (opt.blur) opt.blur(opt.key);
                },
            },
        }),
    ];
}

function img(opt, numLength) {
    return [
        h("img", {
            style: {
                display:
                    opt.data?.length > 0 || opt.src ? "inline-block" : "none",
                // width: '50px',
                height: "50px",
                textAlgn: "center",
                cursor: "pointer",
            },
            src: opt.src,
            onClick: (e) => {
                if (opt.click) opt.click(opt.data);
            },
        }),
        h(
            "span",
            {
                style: {
                    display:
                        numLength && opt.data?.length > 1
                            ? "inline-block"
                            : "none",
                    width: "50px",
                    height: "50px",
                    verticalAlign: "20px",
                },
            },
            "等" + opt.data?.length + "个"
        ),
        h(
            "span",
            {
                style: {
                    display:
                        numLength && opt.data?.length < 1
                            ? "inline-block"
                            : "none",
                },
            },
            "-"
        ),
    ];
}

function select(opt) {
    let options = opt.options.reduce((arr, item) => {
        arr.push(
            h("el-option", {
                props: {
                    value: item.key,
                    label: item.value,
                    key: item.key,
                    disabled: item.disabled || false,
                },
            })
        );
        return arr;
    }, []);
    return [
        h(
            "el-select",
            {
                props: {
                    value: opt.data[opt.key],
                    multiple: opt.multiple,
                    placeholder: opt.placeholder || "请选择",
                    transfer: true,
                },
                style: {
                    width: opt.width || null,
                },
                // ～～～
                on: {
                    "on-change": (e) => {
                        opt.data[opt.key] = e;
                        if (opt.change) opt.change(opt.key);
                    },
                },
            },
            options
        ),
    ];
}
// Tooltip
function Tooltip(opts = {}) {
    return [
        h("div", [
            h("span", {}, opts.title),
            h(
                "el-tooltip",
                {
                    props: {
                        placement: opts.placement || "top-start",
                        content: opts.tipsTxt || "-",
                        transfer: opts.transfer || true,
                        trigger: opts.trigger || "hover",
                        offset: opts.offset || "-13",
                        theme: opts.theme || "dark",
                    },
                    style: {
                        ...opts.TooltipStyle,
                    },
                },
                [
                    h("Icon", {
                        props: {
                            type: opts.icon,
                        },
                        style: {
                            ...opts.iconStyle,
                        },
                    }),
                ]
            ),
        ]),
    ];
}

function tree(row, render, config, update) {
    return [
        h(
            "dt-tree-icon",
            {
                props: { row, config },
                // ～～～
                on: { update },
            },
            [render]
        ),
    ];
}

function option(opt, field, row) {
    if (opt.text) {
        let value = opt.value
            ? opt.value(row)
            : field && row
            ? dt.tool.getVal(row, field)
            : opt.placeholder;
        return text({
            ...opt.text,
            value,
        });
    } else if (opt.btn) {
        let valid = (b) => {
            // ～～～ unlocking
            return b.visible != false && !b.code;
        };
        if (Array.isArray(opt.btn)) {
            let bs = [];
            opt.btn.forEach((b) => {
                let nb = { ...b };
                if (valid(nb)) {
                    if (!nb.data) {
                        nb.data = row;
                    }
                    bs.push(nb);
                }
            });
            return btns(bs);
        } else {
            let nb = { ...opt.btn };
            if (!nb.data) {
                nb.data = row;
            }
            if (valid(nb)) {
                return btn(nb);
            }
            return [];
        }
    } else if (opt.filter) {
        return arrow(opt.filter);
    } else if (opt.checkbox) {
        return checkbox(opt.checkbox, field, row);
    } else if (opt.edit) {
        if (!opt.edit.key) {
            opt.edit.key = field;
        }
        return edit(opt.edit, row);
    } else if (opt.group) {
        return group(opt.group, row);
    } else if (opt.Tooltip) {
        return Tooltip(opt.Tooltip);
    } else if (opt.img) {
        return img(opt.img, field, row);
    }
}

export default {
    option,
    header: {
        arrow,
        checkbox,
        group: hGroup,
    },
    cell: {
        btn,
        btns,
        text,
        input,
        select,
        edit,
        icon,
        img,
        tree,
        checkbox,
    },
};
