<template>
    <el-button
        v-if="option.button.title"
        :type="option.button.type"
        :style="option.button.style"
        :disabled="option.disabled"
        :ghost="option.button.ghost || false"
        :shape="option.button.shape"
        :icon="option.button.icon"
        :size="option.button.size"
        @click="option.button.click"
    >
        {{ option.button.title ?? null }}
    </el-button>

    <el-button
        v-else
        :type="option.button.type"
        :style="option.button.style"
        :disabled="option.disabled"
        :ghost="option.button.ghost || false"
        :shape="option.button.shape"
        :icon="option.button.icon"
        :size="option.button.size"
        @click="option.button.click"
    />
</template>

<script setup>
defineProps({
    option: Object,
});
</script>

<style></style>
