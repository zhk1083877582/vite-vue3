<!-- src/views/content/test/test3/components/DecisionNode.vue -->
<template>
    <div
        class="decision-node"
        @mouseenter="$emit('mouseenter', $event)"
        @mouseleave="$emit('mouseleave', $event)"
    >
        <div class="diamond">
            {{ data.label }}
        </div>
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
.decision-node {
    transform: rotate(45deg);
    width: 40px;
    height: 40px;
    background: #fff;
    border: 2px solid #faad14;
    display: flex;
    align-items: center;
    justify-content: center;
}

.diamond {
    transform: rotate(-45deg);
    font-size: 12px;
    text-align: center;
}
</style>
