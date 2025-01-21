<script setup>
import { ref } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";

// these components are only shown as examples of how to use a custom node or edge
// you can find many examples of how to create these custom components in the examples page of the docs
import SpecialNode from "./components/SpecialNode.vue";
import SpecialEdge from "./components/SpecialEdge.vue";

const nodes = ref([
    {
        id: "1",
        type: "tmp",
        position: { x: 250, y: 5 },
        data: { label: "Node 1", id: "1" },
        // draggable: false, // 禁用节点拖拽
    },

    {
        id: "2",
        type: "tmp",
        position: { x: 100, y: 100 },
        data: { label: "Node 2", id: "2" },
    },

    {
        id: "3",
        type: "tmp",
        position: { x: 400, y: 200 },
        data: { label: "Node 3", id: "3" },
    },

    {
        id: "4",
        position: { x: 500, y: 400 },
        type: "tmp",
        data: {
            label: "Node 4",
            hello: "world",
            id: "4",
        },
    },
]);

// these are our edges
const edges = ref([
    // default bezier edge
    // consists of an edge id, source node id and target node id
    {
        id: "e1->2",
        source: "1",
        type: "step",
        target: "2",
    },

    // set `animated: true` to create an animated edge path
    {
        id: "e2->3",
        source: "1",
        type: "step",
        target: "3",
        // animated: true,
    },

    // a custom edge, specified by using a custom type name
    // we choose `type: 'special'` for this example
    {
        id: "e3->4",
        type: "special",
        type: "step",
        source: "3",
        target: "4",

        // all edges can have a data object containing any data you want to pass to the edge
        data: {
            hello: "world123123",
        },
    },
]);

const {
    onNodeDragStart,
    onNodeDrag,
    onNodeDragStop,
    onNodeClick,
    onNodeDoubleClick,
    onNodeContextMenu,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeMouseMove,
} = useVueFlow();

const [infoRef] = [ref()];
let iofoTitle = ref("");
onNodeClick((event) => {
    console.log("Node onNodeClick ", event);
    iofoTitle.value = event.node.data.label;
    infoRef.value.show();
});
</script>

<template>
    <VueFlow
        :zoom-on-scroll="false"
        :pan-on-drag="false"
        :nodes-draggable="false"
        :nodes="nodes"
        :edges="edges"
    >
        <!--  :pan-on-drag="false" 禁止画布拖拽-->
        <!-- :nodes-draggable="false" 禁止所有节点拖拽 -->
        <template #node-tmp="tmpNodes">
            <SpecialNode v-bind="tmpNodes" />
        </template>

        <template #edge-special="specialEdges">
            <SpecialEdge v-bind="specialEdges" />
        </template>
    </VueFlow>
    <dt-modal-info ref="infoRef" :title="iofoTitle"></dt-modal-info>
</template>

<style></style>
