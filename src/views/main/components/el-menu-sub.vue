<script setup>
	const props = defineProps({
		item: Object
	});
</script>

<template>
	<el-sub-menu v-if="item.children?.length" :index="item.name" popper-class="my-menu-popper">
		<template #title>
			<el-icon v-show="item.icon" :class="[item.icon, 'iconfont', 'menu-icon']"></el-icon>
			<span>{{ item.title }}</span>
		</template>
		<el-menu-sub v-for="i in item.children" :key="i.name" :item="i" />
	</el-sub-menu>
	<el-menu-item v-else :index="item.name">
		<el-icon :class="[item.icon, 'iconfont', 'menu-icon']"></el-icon>
		<span>{{ item.title }}</span>
	</el-menu-item>
</template>

<style scoped lang="scss">
	@import url("@/assets/css/sider.scss");
</style>
<style lang="scss">
	.my-menu-popper {
	}
</style>
