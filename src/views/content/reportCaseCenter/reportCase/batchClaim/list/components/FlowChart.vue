<template>
    <div class="flow-wrapper">
        <VueFlow
            v-model="elements"
            :default-zoom="0.8"
            :min-zoom="0.2"
            :max-zoom="4"
            :fit-view-on-init="true"
            :node-types="nodeTypes"
            :edge-types="edgeTypes"
            @nodeClick="onNodeClick"
            class="flow"
        >
            <template #node-process="props">
                <ProcessNode v-bind="props" />
            </template>
            <template #node-decision="props">
                <DecisionNode v-bind="props" />
            </template>
            <Controls />
            <Background pattern-color="#aaa" gap="8" />
        </VueFlow>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { VueFlow, Background, Controls, useVueFlow } from "@vue-flow/core";
import "@vue-flow/core/dist/style.css";
import ProcessNode from "./nodes/ProcessNode.vue";
import DecisionNode from "./nodes/DecisionNode.vue";
import { initialNodes, initialEdges } from "./flowData";

// 节点类型注册
const nodeTypes = {
    process: ProcessNode,
    decision: DecisionNode,
};

// 初始化数据
const elements = ref([]);

onMounted(() => {
    elements.value = [...initialNodes, ...initialEdges];
});

// 节点点击事件
const onNodeClick = (event, node) => {
    console.log("Node clicked:", node);
};
</script>

<style scoped>
.flow-wrapper {
    width: 100%;
    height: 800px;
}

.flow {
    background: #fff;
}
</style>
