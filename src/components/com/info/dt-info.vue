<template>
    <div class="content">
        <el-form
            ref="form"
            :model="infos"
            :label-width="labelW"
            label-colon
            @submit.native.prevent
            :key="key"
        >
            <template v-if="lineNumber">
                <el-row :gutter="20">
                    <template v-for="opt in opts" :key="opt.key">
                        <el-col
                            :span="opt.col || 24 / lineNumber"
                            v-if="opt.visible != false"
                        >
                            <item
                                ref="item"
                                :option="opt"
                                :info="infos"
                                @change="onChange"
                            ></item>
                        </el-col>
                    </template>
                </el-row>
            </template>
            <template v-else>
                <el-row v-for="(opts, idx) in opts" :key="idx" :gutter="20">
                    <template
                        v-for="opt in Array.isArray(opts) ? opts : [opts]"
                        :key="opt.key"
                    >
                        <el-col
                            :span="opt.col || 24 / optLength(opts)"
                            v-if="opt.visible != false"
                        >
                            <item
                                ref="item"
                                :option="opt"
                                :info="infos"
                                @change="onChange"
                            ></item>
                        </el-col>
                    </template>
                </el-row>
            </template>
        </el-form>
    </div>
</template>

<script>
import item from "./dt-info-item.vue";
import { Opt } from "../Opt.js";

export default {
    components: {
        item,
    },
    props: {
        lineNumber: Number, // opts 需为一维数组
        opt: Opt,
        info: Object,
        labelWidth: Number,
    },
    computed: {
        labelW() {
            if (this.opts) {
                let max = null;
                let set = (i) => {
                    if (i.visible != false) {
                        max = Math.max(i.labelWidth, max || 0);
                    }
                };
                this.opts.forEach((i) => {
                    if (Array.isArray(i)) {
                        i.forEach((j) => {
                            set(j);
                        });
                    } else {
                        set(i);
                    }
                });
                return max || this.labelWidth || 120;
            }
            return 120;
        },
    },
    watch: {
        opt(n) {
            this.opts = n.options();
            this.infos = n.info;
        },
        info(n) {
            this.infos = n;
        },
    },
    data() {
        return {
            isClear: false,
            opts: null,
            infos: null,
            key: 1,
        };
    },
    mounted() {
        if (this.opt) {
            this.opts = this.opt.options();
        }
        this.infos = this.info || this.opt?.info;
    },
    methods: {
        init(Opt, info) {
            console.log("🚀 ~ init ~ Opt, info:", Opt.options(), info);
            this.opts = Opt.options();
            this.infos = info || Opt.info;
            this.key++;
        },
        validate() {
            return this.$refs.form.validate();
        },
        clear() {
            this.isClear = true;
            let items = this.$refs.item;
            if (items) {
                for (let item of items) {
                    item.clear();
                }
            }
            this.$refs.form.resetFields();
            this.opts = null;
            this.infos = null;
        },
        resetFields() {
            this.isClear = true;
            let items = this.$refs.item;
            if (items) {
                for (let item of items) {
                    item.clear();
                }
            }
            this.$refs.form.resetFields();
        },
        update() {
            this.isClear = false;
            let items = this.$refs.item;
            if (items) {
                for (let item of items) {
                    item.update();
                }
            }
        },
        onChange(data) {
            console.log(data);
            if (!this.isClear) {
                if (data.option?.rules) {
                    setTimeout(() => {
                        // 需要更新rules后才校验
                        this.$refs.form.validateField(
                            data.option.ruleKey || data.option.key
                        );
                        if (data.option.associationRules) {
                            this.resetValidate(data.option.associationRules);
                        }
                    }, 100);
                }
                this.$emit("change", data);
            }
        },
        resetValidate(tarKeyArr) {
            this.$nextTick(() => {
                // 重置部分表单验证
                for (let item of this.$refs.form.fields) {
                    //form为表单的ref名称，fields为该表单下需要验证的所有字段，tarKeyArr为需要重置的所有字段
                    if (tarKeyArr.indexOf(item.prop) !== -1) {
                        item.resetField();
                    }
                }
            });
        },
        optLength(opts) {
            let num = 0;
            if (Array.isArray(opts)) {
                opts.forEach((opt) => {
                    if (opt.visible != false) {
                        num++;
                    }
                });
            } else {
                num = 1;
            }
            return num;
        },
    },
};
</script>

<style lang="scss" scoped>
.content {
}
</style>
