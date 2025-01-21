<template>
    <div>
        dsptquerydsptquerydsptquerydsptquery
        <el-button @click="handelClick">messageBox</el-button>
    </div>
</template>

<script setup>
import dt from "@/config/dt";

const handelClick = () => {
    dt.ui
        .messageBox({
            title: "123",
            message: "sadasdas",
            showCancelButton: true,
            confirmButtonText: "确2定11",
            cancelButtonText: "取消222",
            type: "warning",
        })
        .then((res) => {
            console.log("🚀 ~ handelClick ~ res:", res);
        })
        .catch((close) => {
            console.log("🚀 ~ handelClick ~ close:", close);
        });
};
</script>

<style lang="scss" scoped></style>
