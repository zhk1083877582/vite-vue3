import dt from "@/config/dt";

function twoDecimal() {
    let validator = (rule, value, callback) => {
        let reg = /^[\d,-]?\d+(\.\d{1,2}){0,1}$/;
        if (!reg.test(value)) {
            return callback("数值只能保留两位小数");
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function positiveInteger() {
    let validator = (rule, value, callback) => {
        let reg = /^[1-9]\d*$/;
        if (!reg.test(value)) {
            return callback("数值只能为正整数");
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function phone() {
    let validator = (rule, value, callback) => {
        let reg =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!reg.test(value)) {
            return callback("请输入正确的手机号");
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function positiveNumber() {
    let validator = (rule, value, callback) => {
        if (value < 0) {
            return callback("数值只能为正数");
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function maxNum(number) {
    let validator = (rule, value, callback) => {
        if (value > number) {
            return callback(`数值不能大于${number}`);
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function minNum(number) {
    let validator = (rule, value, callback) => {
        if (value <= number) {
            return callback(`数值不能小于${number}`);
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function percent() {
    let validator = (rule, value, callback) => {
        if (value > 100) {
            return callback("数值不能大于100%");
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}

function check(msg, ok, trigger) {
    let validator = (rule, value, callback) => {
        if (ok(value)) {
            return callback(msg);
        }
        callback();
    };
    return {
        validator,
        trigger: trigger || "blur",
    };
}

function max(number) {
    return {
        max: number,
        message: `最多输入${number}个字`,
        trigger: "blur,change",
    };
}

function password() {
    let validator = (rule, value, callback) => {
        let reg = /^\d{6,10}$/;
        if (value && !reg.test(value)) {
            return callback("密码只可输入6-10位数字");
        }
        callback();
    };
    return {
        validator,
        trigger: "change",
    };
}

function required(msg, type = "string") {
    return {
        type,
        required: true,
        message: msg,
        trigger: "blur",
    };
}

function section() {
    let validator = (rule, value, callback) => {
        if (value > 100 || value < 0 || value == "") {
            return callback("数值范围为0-100");
        }
        callback();
    };
    return {
        validator,
        trigger: "blur",
    };
}
function timeInterval(time = 2) {
    let validator = (rule, value, callback) => {
        if (value && value.length == 0) {
            callback();
        } else if (
            value &&
            value.length == 2 &&
            dt.tool.dateDiff(value[0], value[1]).Y >= time
        ) {
            return callback("日期跨度至多两年");
        }
        callback();
    };
    return {
        validator,
        trigger: "none",
    };
}

export default {
    twoDecimal,
    positiveNumber,
    percent,
    check,
    max,
    maxNum,
    minNum,
    required,
    section,
    phone,
    positiveInteger,
    password,
    timeInterval,
};
