export class Filter {
    constructor() {
        this.conditions = {}; // info label option choice
    }
    initOpt(option) {
        // 初始化
        if (!this.conditions[option.key]) {
            this.conditions[option.key] = { option, info: {} };
        }
    }
    updateOpts(options) {
        // 初始化
        Object.keys(this.conditions).forEach((key) => {
            if (!options?.some((opt) => opt.key == key)) {
                this.conditions[key].choice = false;
                this.conditions[key].info = {};
                this.conditions[key].label = null;
            }
        });
    }
    info(key) {
        // 取当前值
        return this.conditions[key].info;
    }
    choice(key, val = true) {
        // 选择
        console.log(this.conditions[key].label, "kkkk");
        this.conditions[key].choice = !!(val && this.conditions[key].label);
        if (!val) {
            this.conditions[key].info = {};
        }
    }
    clear() {
        // 清空
        Object.keys(this.conditions).forEach((key) => {
            this.conditions[key].choice = false;
            this.conditions[key].info = {};
            this.conditions[key].label = null;
        });
    }
    value(opt, val) {
        // 赋值
        let key = opt.key;
        let label = val;
        if (opt.date) {
            if (Array.isArray(val)) {
                label =
                    val[0].length > 0
                        ? `${val[0].replace(
                              " 00:00:00",
                              ""
                          )} ~ ${val[1].replace(" 23:59:59", "")}`
                        : null;
            } else {
                label = val.length > 0 ? val : null;
            }
        } else if (opt.select || opt.cascader) {
            if (Array.isArray(val)) {
                label = "";
                val.forEach((v, i) => {
                    label += v.label;
                    if (i != val.length - 1) {
                        label += ",";
                    }
                });
            } else {
                label = val;
            }
        }
        this.conditions[key].label = label;
        console.log(
            "🚀 ~ Filter ~ value ~ this.conditions[key].label:",
            this.conditions[key].label
        );
    }
    update() {
        let choices = [];
        let infos = {};
        Object.keys(this.conditions).forEach((key) => {
            let item = this.conditions[key];
            if (item.choice) {
                infos = { ...infos, ...item.info };
                choices.push({
                    title: item.option.title,
                    label: item.label,
                    key,
                });
            }
        });
        return {
            choices,
            infos,
        };
    }
}
