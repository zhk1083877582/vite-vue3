<template>
    <el-tooltip
        v-if="tooltip"
        transfer
        style="width: 100%"
        :content="
            option.tipsTxt != null && option.tipsTxt != undefined
                ? option.tipsTxt
                : text
        "
        :placement="option.placement ? option.placement : 'top-start'"
    >
        <div class="text" :style="style" v-html="text"></div>
    </el-tooltip>
    <div
        v-else
        :class="['text', className]"
        :style="option.style || style"
        v-html="text"
    ></div>
</template>

<script>
import textMgr from "../text.js";
export default {
    props: {
        option: Object,
        value: [String, Number],
    },
    watch: {
        option(n, o) {
            this.update();
        },
        value(n) {
            this.update();
        },
    },
    data() {
        return {
            tooltip: false,
            style: {},
            text: "-",
            className: "",
        };
    },
    mounted() {
        this.update();
    },
    methods: {
        update() {
            if (this.option) {
                this.className = this.option.className;
                this.style = textMgr.style(this.option);
                this.text = textMgr.handle(this.option, this.value);
                this.tooltip =
                    this.option.tooltip != null
                        ? this.option.tooltip
                        : this.text.length > (this.option.max || 10);
            }
        },
    },
};
</script>

<style>
.elx-table--tooltip-wrapper {
    z-index: 3001 !important;
    word-break: break-all;
}

.ivu-tooltip-rel {
    vertical-align: bottom;
}

.text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info-label-title {
    position: relative;
    padding-left: 14px;
    margin: 10px 0 10px -14px;
    font-size: 16px;
    font-weight: bold;
}
.info-label-title::before {
    content: "";
    width: 8px;
    height: 16px;
    background: #2d61f4;
    position: absolute;
    left: 0;
    top: 7px;
}
</style>
