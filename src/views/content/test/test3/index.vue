<!-- src/views/content/test/test3/components/FlowChart.vue -->
<template>
    <div class="flow-wrapper">
        <VueFlow
            v-model="elements"
            :default-zoom="1"
            :min-zoom="1"
            :max-zoom="1"
            :prevent-scrolling="true"
            :nodes-draggable="false"
            :nodes-connectable="false"
            :elements-selectable="false"
            :fit-view-on-init="true"
            :node-types="nodeTypes"
            class="flow"
        >
            <template #node-process="props">
                <ProcessNode
                    v-bind="props"
                    @mouseenter="showTooltip($event, props.data)"
                    @mouseleave="hideTooltip"
                />
            </template>
            <template #node-decision="props">
                <DecisionNode
                    v-bind="props"
                    @mouseenter="showTooltip($event, props.data)"
                    @mouseleave="hideTooltip"
                />
            </template>
        </VueFlow>

        <!-- 提示框 -->
        <NodeTooltip
            v-if="tooltipVisible"
            :data="tooltipData"
            :position="tooltipPosition"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { VueFlow } from "@vue-flow/core";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import ProcessNode from "./components/ProcessNode.vue";
import DecisionNode from "./components/DecisionNode.vue";
import NodeTooltip from "./components/NodeTooltip.vue";
import { initialNodes, initialEdges } from "./config/flowData";

// 节点类型注册
const nodeTypes = {
    process: ProcessNode,
    decision: DecisionNode,
};

// 流程图数据
const elements = ref([]);

// 提示框状态
const tooltipVisible = ref(false);
const tooltipData = ref(null);
const tooltipPosition = ref({ x: 0, y: 0 });

// 显示提示框
const showTooltip = (event, data) => {
    tooltipData.value = data;
    tooltipPosition.value = {
        x: event.clientX + 10,
        y: event.clientY + 10,
    };
    tooltipVisible.value = true;
};

// 隐藏提示框
const hideTooltip = () => {
    tooltipVisible.value = false;
};

onMounted(() => {
    elements.value = [...initialNodes, ...initialEdges];
});
</script>

<style scoped>
.flow-wrapper {
    width: 100%;
    height: 800px;
    position: relative;
}

.flow {
    background: #fff;
}

:deep(.vue-flow__node) {
    cursor: default;
}

:deep(.vue-flow__handle) {
    display: none;
}

:deep(.vue-flow__edge-path) {
    stroke: #b1b1b7;
    stroke-width: 2;
    cursor: default;
}

:deep(.vue-flow__edge.animated path) {
    stroke-dasharray: 5;
    animation: dashdraw 0.5s linear infinite;
}

@keyframes dashdraw {
    from {
        stroke-dashoffset: 10;
    }
}
</style>
