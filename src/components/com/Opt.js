import { reactive } from "vue";

export class Opt {
    constructor(obj = {}, info = {}) {
        console.log("🚀 ~ Opt ~ constructor ~ obj = {}, info = {}:", obj, info);
        Object.keys(obj).forEach((k) => (this[k] = obj[k]));
        this.opts = reactive([]);
        this.info = reactive(info);
        this.build();
    }

    // unimplemented 处理组装逻辑 返回数组
    create() {
        console.warn("请实现create方法");
        return [];
    }

    build() {
        this.opts.push(...this.create());
    }

    options() {
        return this.opts;
    }
}
