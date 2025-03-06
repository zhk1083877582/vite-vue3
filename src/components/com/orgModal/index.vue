<!-- 机构部门 -->
<template>
	<el-dialog :model-value="visible" title="机构部门" @closed="closed" style="min-height: 620px" :close-on-click-modal="false" :close-on-press-escape="false" top="50px">
		<!-- <el-input v-model="filterText" class="search" :suffix-icon="Search"></el-input> -->
		<el-input v-model="filterText">
			<template #append>
				<el-button :icon="Search" />
			</template>
		</el-input>
		<el-tree ref="treeRef" :props="treeProps" class="tree" :filter-node-method="filterNode" @node-click="selectOrg" node-key="parentId" lazy :load="loadNode" :expand-on-click-node="false"> </el-tree>
	</el-dialog>
</template>

<script setup>
	import { Search } from "@element-plus/icons-vue";
	const emits = defineEmits(["selectOrg"]);
	const visible = ref(false);
	const closed = () => {
		visible.value = false;
	};
	function show() {
		visible.value = true;
	}
	// tree的引用
	const treeRef = ref();

	// tree配置
	const treeProps = {
		label: "name",
		children: "children"
	};

	// 调用接口,查询机构数据
	const loadNode = (node, resolve) => {
		if (node.level === 0) {
			return resolve(departments);
		}
		return resolve([
			{
				checked: false,
				children: [],
				halfChecked: false,
				hasChildren: true,
				id: "020000000010",
				name: "北京分公司",
				parentId: "020000000001230"
			}
		]);
	};
	// 假数据
	const departments = [
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000010",
			name: "总公司董事会",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000020",
			name: "总公司监事会",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000030",
			name: "总公司总裁室",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000040",
			name: "总公司其他高管",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000050",
			name: "总公司资金运用部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000060",
			name: "总公司综合管理部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000070",
			name: "总公司发展规划部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000080",
			name: "总公司企划精算部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000090",
			name: "总公司人力资源部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000100",
			name: "总公司财务部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000110",
			name: "总公司信息技术部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000120",
			name: "总公司稽核部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000130",
			name: "总公司风险合规部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000140",
			name: "总公司后援中心",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000150",
			name: "总公司业务管理部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000160",
			name: "总公司再保部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000170",
			name: "总公司互联网发展部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000000180",
			name: "总公司航运事业部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000983010",
			name: "总公司业务部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "020000990000",
			name: "总公司营业部",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "021300000000",
			name: "河北分公司",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "023700000000",
			name: "山东分公司",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "023702000000",
			name: "青岛分公司",
			parentId: "020000000000"
		},
		{
			checked: false,
			children: [],
			halfChecked: false,
			hasChildren: true,
			id: "029900000000",
			name: "公估公司",
			parentId: "020000000000"
		}
	];

	// 选择机构
	const selectOrg = org => {
		console.log("org", org);
		emits("selectOrg", org);
		closed();
	};

	// 搜索机构
	const filterText = ref("");
	// watch(filterText, val => {
	// 	treeRef.value!.filter(val);
	// });
	// 接口调用
	const filterNode = (value, data) => {
		if (!value) return true;
		return data.name.includes(value);
	};
	defineExpose({
		show
	});
</script>

<style scoped lang="scss">
	.search {
		margin-bottom: 10px;
		width: 200px;
	}

	.tree {
		max-height: 500px;
		overflow: auto;
	}
</style>
