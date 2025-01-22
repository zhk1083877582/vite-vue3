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
        imglist: [
            {
                url: "https://images.tospurfang.com/hft/fafa46b7ea0642768e2014c8018be699.jpg",
                alt: "图片1",
            },
            {
                url: "https://images.tospurfang.com/hft/7a8703795cf541f989e24a27b10a899b.jpg",
                alt: "图片1",
            },
        ],
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
const [selectValue, selectOptions] = [
    ref(1),
    ref([
        { key: 1, value: "Option A", desc: "Option A - 230506" },
        { key: 2, value: "Option B", desc: "Option B - 230506" },
        { key: 3, value: "Option C", desc: "Option C - 230506" },
        { key: 4, value: "Option A", desc: "Option A - 230507" },
    ]),
];
const selectChange = (val) => {
    console.log("🚀 ~ selectChange ~ val:", val);
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
        <el-select
            v-model="selectValue"
            placeholder="Select"
            style="width: 240px"
            @change="selectChange"
        >
            <el-option
                v-for="item in selectOptions"
                :key="item.key"
                :label="item.value"
                :value="item"
            />
        </el-select>
    </div>
</template>

<style scoped></style>
