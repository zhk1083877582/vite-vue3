import dt from "@/config/dt";

function handle(opt, txt) {
    if (txt && opt) {
        if (opt.type == "number") {
            txt = Number(txt).toFixed(
                opt.fixed == null || opt.fixed == undefined ? 2 : opt.fixed
            );
            txt = String(txt).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (opt.unit) {
                txt += opt.unit;
            }
        } else if (opt.type == "dict") {
            txt = dt.dictInfo().__value(opt.key, txt);
        } else if (opt.type == "date") {
            txt = txt.split(" ")[0];
        }
    }

    return txt !== null && txt !== "" && txt !== "NaN" && txt !== undefined
        ? txt
        : "-";
}

function style(opt) {
    if (opt && hasStyle(opt)) {
        return {
            color: opt.color,
            whiteSpace: opt.whiteSpace || "nowrap",
            lineClamp: opt.lineClamp || "", //设置div的文本为2行
            webkitBoxOrient: opt.webkitBoxOrient || "",
            display: opt.display || "block",
            wordWrap: opt.wordWrap,
            textAlign: opt.textAlign,
            height: opt.height,
            width: opt.width,
            float: opt.float,
            position: opt.position,
            left: opt.left,
            opacity: opt.opacity,
            lineHeight: opt.lineHeight,
            wordBreak: opt.wordBreak,
        };
    }
    return {
        whiteSpace: "nowrap",
        display: "block",
    };
}

function hasStyle(opt) {
    let has =
        opt.color ||
        opt.whiteSpace ||
        opt.lineClamp ||
        opt.webkitBoxOrient ||
        opt.display ||
        opt.wordWrap ||
        opt.show ||
        opt.textAlign ||
        opt.height ||
        opt.width ||
        opt.float ||
        opt.position ||
        opt.left ||
        opt.opacity ||
        opt.lineHeight;
    return has;
}

export default {
    handle,
    style,
    hasStyle,
};
