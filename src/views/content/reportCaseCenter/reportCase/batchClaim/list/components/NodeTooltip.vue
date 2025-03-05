<!-- src/views/content/test/test3/components/NodeTooltip.vue -->
<template>
    <div class="node-tooltip" :style="tooltipStyle">
        <div class="tooltip-title">{{ data.label }}</div>
        <div class="tooltip-content">
            <div v-if="data.description">{{ data.description }}</div>
            <div v-if="data.status">状态: {{ getStatusText(data.status) }}</div>
            <div v-if="data.time">时间: {{ data.time }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    position: {
        type: Object,
        required: true,
    },
});

const tooltipStyle = computed(() => ({
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
}));

const getStatusText = (status) => {
    const statusMap = {
        active: "进行中",
        completed: "已完成",
        pending: "待处理",
    };
    return statusMap[status] || status;
};
</script>

<style scoped>
.node-tooltip {
    position: fixed;
    z-index: 1000;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-width: 200px;
}

.tooltip-title {
    font-weight: bold;
    margin-bottom: 8px;
    color: #1890ff;
}

.tooltip-content {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}
</style>
