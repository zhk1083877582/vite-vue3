<script setup>
import { onMounted, reactive } from "vue";
import { editOpt } from "./biz/edit";
const [msgRef, menuMsgInfo] = [
    ref(),
    ref({
        number1: "123123132",
        date1: "2025-01-17 15:54:34",
        day1: null,
        day2: ["2025-01-17", "2025-01-25"],
        date3: null,
        select1: [],
        select2: "",
        radio1: "",
        checkBox1: [],
        button1: "",
        tag1: [],
        insId: [],
        regionId: [],
        switch1: null,
        dtTime: null,
    }),
];
onMounted(() => {
    console.log("🚀 ~ onMounted ~ new editOpt():", new editOpt());

    msgRef.value.init(new editOpt(), menuMsgInfo.value);
});
const radio1 = ref();
const handleChange = (val, data) => {
    console.log(val, data);
    // cascaderRef.value.getCheckedNodes();
    console.log(
        "🚀 ~ handleChange ~ cascaderRef.value.getCheckedNodes():",
        cascaderRef.value.getCheckedNodes()
    );
};

const cascaderRef = ref();
const [selectedValue, options] = [
    ref([]),
    [
        // 选项数据
        {
            id: 1,
            name: "Option 1",
            children: [
                { id: 2, name: "Option 1-1" },
                { id: 3, name: "Option 1-2" },
            ],
        },
        {
            id: 4,
            name: "Option 2",
            children: [{ id: 5, name: "Option 2-1" }],
        },
    ],
]; // 绑定的值，通常是选项的id数组
const times = reactive({ time1: null, value2: null });
const timeChange = (val) => {
    console.log(val);
};
</script>

<template>
    <div>
        <!-- <el-date-picker v-model="value1" type="date" @change="handelChange" /> -->
        <dt-info ref="msgRef"></dt-info>
        <!-- <el-radio-group v-model="radio1" @change="handelChange">
        <el-radio value="1" size="large">Option 1</el-radio>
        <el-radio value="2" size="large">Option 2</el-radio>
    </el-radio-group> -->

        <el-cascader
            ref="cascaderRef"
            v-model="selectedValue"
            :options="options"
            :props="{ value: 'id', label: 'name', children: 'children' }"
            @change="handleChange"
        ></el-cascader>
        <el-time-picker
            v-model="times.time1"
            placeholder="Arbitrary time"
            @change="timeChange"
        />

        <el-date-picker
            v-model="times.value2"
            type="daterange"
            @change="timeChange"
        />
    </div>
</template>

<style scoped></style>
