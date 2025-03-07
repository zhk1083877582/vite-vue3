<!-- 内容组件样式 -->
<template>
	<div class="freeedit">
		<div class="title-warp">
			<div class="title">{{ title }}</div>
		</div>

		<div class="content-body">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: String
	});
</script>
<style scoped lang="scss">
	.freeedit {
		padding: 5px;
		margin-bottom: 10px;

		.title-warp {
			padding: 0 24px;
			background-color: #e4f0f4;
			.title {
				border-bottom: 1px solid #e8e8e8;
				border-radius: 2px 2px 0 0;
				zoom: 1;
				margin-bottom: -1px;
				color: #333;
				font-size: 0.9rem;
				padding: 9px 0;
				font-weight: 600;
			}
		}
		.content-body {
			padding: 24px;
		}
	}
</style>
