<template>
    <el-dialog
        v-model="modal"
        :title="title"
        :width="width"
        @close="onVisibleChange"
        :transfer="true"
        :show-close="showClose || false"
        header-class="modal-header"
        body-class="modal-body"
        :draggable="draggable"
        :fullscreen="fullscreen"
    >
        <template v-slot:footer>
            <div class="footer">
                <el-button @click="onClose">关闭</el-button>
            </div>
        </template>
        <slot></slot>
        <dt-info
            :line-number="lineNumber"
            :label-width="labelWidth"
            ref="info"
        ></dt-info>
        <slot name="bottom"></slot>
    </el-dialog>
</template>

<script>
export default {
    props: {
        width: Number,
        title: String,
        labelWidth: Number,
        lineNumber: Number,
        transfer: Boolean,
        draggable: Boolean,
        fullscreen: Boolean,
        showClose: Boolean,
    },
    data() {
        return {
            modal: false,
            info: null,
        };
    },
    methods: {
        show(Opt, info) {
            this.modal = true;
            this.$nextTick(() => {
                if (Opt) {
                    this.$refs.info.init(Opt, info);
                }
            });
        },
        hide() {
            this.modal = false;
        },
        onClose() {
            this.modal = false;
        },
        onVisibleChange(show) {
            console.log("🚀 ~ onVisibleChange ~ show:", show);
            if (!show) {
                this.$emit("close");
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
