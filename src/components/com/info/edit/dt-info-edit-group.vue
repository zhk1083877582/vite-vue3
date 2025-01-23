<template>
    <div style="width: 100%">
        <el-row
            :gutter="8"
            v-for="(group, idx) in Array.isArray(option.group[0])
                ? option.group
                : [option.group]"
            :key="idx"
        >
            <template v-for="(opt, i) in group" :key="i">
                <el-col
                    :span="opt.col || 24 / group.length"
                    :flex="opt.flex"
                    v-if="opt.visible != false"
                >
                    <edit
                        ref="edit"
                        :option="opt"
                        :info="info"
                        @change="onChange"
                    ></edit>
                </el-col>
            </template>
            <div
                v-if="option.tips"
                class="tips"
                :style="{ color: option.tipsColor }"
                v-html="option.tips"
            ></div>
        </el-row>
    </div>
</template>

<script>
import edit from "./dt-info-edit.vue";
export default {
    components: {
        edit,
    },
    props: {
        option: Object,
        info: Object,
    },
    data() {
        return {};
    },
    methods: {
        clear() {
            let edits = this.$refs.edit;
            if (edits) {
                if (edits.constructor === Array) {
                    for (let item of edits) {
                        item.clear();
                    }
                } else {
                    edits.clear();
                }
            }
        },
        update() {
            let edits = this.$refs.edit;
            if (edits) {
                if (edits.constructor === Array) {
                    for (let item of edits) {
                        item.update();
                    }
                } else {
                    edits.update();
                }
            }
        },
        onChange(data) {
            this.$emit("change", data);
        },
    },
};
</script>

<style lang="scss" scoped>
.content {
}
</style>
