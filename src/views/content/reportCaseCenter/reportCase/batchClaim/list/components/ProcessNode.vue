<!-- src/views/content/test/test3/components/ProcessNode.vue -->
<template>
    <div
        :class="['process-node', data.status]"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"
    >
        {{ data.label }}
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object,
        required: true,
    },
});

defineEmits(["mouseenter", "mouseleave"]);
</script>

<style scoped>
.process-node {
    padding: 8px 16px;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    background: #13c2c2;
    color: white;
}

.process-node.active {
    background: #1890ff;
}

.process-node.completed {
    background: #52c41a;
}

.process-node.pending {
    background: #faad14;
}
</style>
