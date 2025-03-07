<template>
	<div>
		<el-button @click="saveFun">save</el-button>
		<el-button @click="changeColorFun">changeColorFun</el-button>
		<el-button @click="todetail">detail</el-button>
		<dt-info ref="msgRef"></dt-info>
	</div>
</template>
<script setup>
	import { onMounted, reactive } from "vue";
	import router from "@/router";
	import { editOpt } from "./biz/edit";
	import { settingStore } from "@/store/setting";
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
			dtTime2: null,
			imglist: [
				{
					url: "https://images.tospurfang.com/hft/fafa46b7ea0642768e2014c8018be699.jpg",
					name: "图片1"
				},
				{
					url: "https://images.tospurfang.com/hft/7a8703795cf541f989e24a27b10a899b.jpg",
					name: "图片2"
				},
				{
					url: "https://images.tospurfang.com/hft/fafa46b7ea0642768e2014c8018be699.jpg",
					name: "图片1"
				},
				{
					url: "https://images.tospurfang.com/hft/fafa46b7ea0642768e2014c8018be699.jpg",
					name: "图片1"
				},
				{
					url: "https://images.tospurfang.com/hft/7a8703795cf541f989e24a27b10a899b.jpg",
					name: "图片2"
				}
			],
			switch1: false,
			visibleSelect: null,
			filesData: [
				{
					name: "hft/b5c39449335744a19a804068dd95921b.xlsx",
					url: "https://images.tospurfang.com/hft/b5c39449335744a19a804068dd95921b.xlsx",
					dateTIme: "2025-02-06"
				}
			]
		})
	];
	const fun = {
		infoData: menuMsgInfo.value,
		updateEdit: () => {
			msgRef.value.resetValidate(["visibleSelect"]);
		}
	};
	onMounted(() => {
		msgRef.value.init(new editOpt(fun), menuMsgInfo.value);
	});
	const radio1 = ref();
	const handleChange = (val, data) => {
		console.log(val, data);
		// cascaderRef.value.getCheckedNodes();
		console.log("🚀 ~ handleChange ~ cascaderRef.value.getCheckedNodes():", cascaderRef.value.getCheckedNodes());
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
					{ id: 3, name: "Option 1-2" }
				]
			},
			{
				id: 4,
				name: "Option 2",
				children: [{ id: 5, name: "Option 2-1" }]
			}
		]
	]; // 绑定的值，通常是选项的id数组
	const times = reactive({ time1: null, value2: null });
	const timeChange = val => {
		console.log(val);
	};
	const [selectValue, selectOptions] = [
		ref(1),
		ref([
			{ key: 1, value: "Option A", desc: "Option A - 230506" },
			{ key: 2, value: "Option B", desc: "Option B - 230506" },
			{ key: 3, value: "Option C", desc: "Option C - 230506" },
			{ key: 4, value: "Option A", desc: "Option A - 230507" }
		])
	];
	const selectChange = val => {
		console.log("🚀 ~ selectChange ~ val:", val);
	};

	function saveFun() {
		msgRef.value
			.validate()
			.then(res => {
				console.log("🚀 ~ msgRef.value.validate ~ res:", res);
				if (res) {
					console.log("🚀 ~ msgRef.value.validate ~ res:", menuMsgInfo);
				}
			})
			.catch(err => {
				console.log("🚀 ~ msgRef.value.validate ~ err:", err);
			});
	}
	function changeColorFun() {
		settingStore().setElementThemeColor("#e6a23c");
	}
	function todetail() {
		router.goRoot("reportCaseCenter/reportCase/queryPcis/detail", { id: "123123" });
	}
</script>

<style scoped lang="scss"></style>
