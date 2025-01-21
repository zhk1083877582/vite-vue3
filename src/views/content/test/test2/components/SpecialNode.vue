<script setup>
import { computed, onMounted, ref } from "vue";
import { Position, Handle } from "@vue-flow/core";

const props = defineProps({
    position: {
        type: Object,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
});
const nodeStyle = computed(() => {
    let backgroundColor;
    switch (props.data.id) {
        case "1":
            backgroundColor = "red";
            break;
        case "2":
            backgroundColor = "green";
            break;
        case "3":
            backgroundColor = "blue";
            break;
        default:
            backgroundColor = "gray";
    }
    return {
        backgroundColor,
        padding: "10px",
        borderRadius: "5px",
        color: "white",
    };
});
let x = ref(""),
    y = ref("");
onMounted(() => {
    console.log("🚀 ~ onMounted ~ props", props.position.x);
    x.value = computed(() => `${Math.round(props.position.x)}px`);
    y.value = computed(() => `${Math.round(props.position.y)}px`);
    console.log(
        "🚀 ~ x:",
        Math.round(props.position.x),
        Math.round(props.position.y)
    );
});
</script>

<template>
    <div class="vue-flow__node-default" :style="nodeStyle">
        <div>{{ data.label }}</div>

        <div>{{ x }}--{{ y }}</div>

        <Handle type="source" :position="Position.Bottom" />
    </div>
</template>
