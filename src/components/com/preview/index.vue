<template>
    <el-image-viewer
        :url-list="images"
        v-if="RefImage"
        @close="close"
        :initial-index="showIndex"
    >
        <template #viewer>
            <div class="viewerDownload" title="点击下载">
                <el-link
                    :href="images.showIndex"
                    style="color: #fff; font-size: 20px"
                    :underline="false"
                    :download="images.showIndex"
                    target="_blank"
                >
                    <el-icon><Download /></el-icon>
                </el-link>
            </div>
        </template>
        <!-- <template #default>
            <div style="position: absolute; bottom: 20px; right: 20px">
                <el-button type="primary">自定义按钮</el-button>
            </div>
        </template> -->
    </el-image-viewer>
</template>

<script setup>
const props = defineProps({
    images: Array,
    showIndex: Number,
});
let RefImage = ref(false);
const show = (val) => {
    RefImage.value = true;
};
const close = () => {
    RefImage.value = false;
};
defineExpose({
    show,
});
</script>

<style lang="scss" scoped></style>
