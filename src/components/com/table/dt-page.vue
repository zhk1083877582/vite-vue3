<!-- 分页器 -->
<template>
    <div
        style="display: flex; line-height: 80px; height: 80px; overflow: hidden"
        v-if="page?.total > 0"
    >
        <div style="flex: 1" v-if="!page.show" />
        <div style="flex: 1" v-else>
            <!-- 当前第 {{ page.current }} 页 -->
            当前第
            {{ (page.current - 1) * page.rows + 1 }} ~
            {{ Math.min(page.current * page.rows, page.total) }}
            条
        </div>
        <el-pagination
            v-if="page.options"
            v-model:page-size="page.rows"
            :model-value="page.current"
            :page-sizes="page.options"
            :background="true"
            layout="sizes, prev, pager, next, jumper, total"
            :total="page.total"
            @current-change="onChange"
            @size-change="onSizeChange"
        />
    </div>
</template>

<script setup>
import { watch } from "vue";
const props = defineProps({
    page: Object,
});
const emits = defineEmits(["change"]);

watch(
    () => props.page,
    (n) => {
        if (n) {
            if (n.total == null) n.total = 0;
            if (n.show == null) n.show = true;
            if (n.current == null) n.current = 1;
            if (n.rows == null) n.rows = 50;
            if (n.options == null) n.options = [10, 20, 30, 40, 50];
        }
    },
    { immediate: true }
);

function onChange(num) {
    if (props.page.current != num) {
        props.page.current = num;
        emits("change");
    }
}

function onSizeChange(rows) {
    if (props.page.rows != rows) {
        props.page.rows = rows;
        props.page.current = 1;
        emits("change");
    }
}
</script>

<style lang="scss" scoped></style>
