<!-- 面包屑 -->
<template>
	<nav class="breadcrumb" aria-label="breadcrumb">
		<ul>
			<li v-for="(item, index) in breadList" :key="item.path">
				<div class="item-cl">
					<span>
						<!-- {{ getMetaMenuTitle(item) === 'iframe' ? getIframeTitle() : getMetaMenuTitle(item) }} -->
						{{ item }}
					</span>
				</div>
				<i v-if="!isLastItem(index)" aria-hidden="true">/</i>
			</li>
		</ul>
	</nav>
</template>

<script setup>
	import { useRouter, useRoute } from "vue-router";
	const route = useRoute();
	const router = useRouter();
	const breadList = ref([]);

	// 计算函数
	const isLastItem = index => index === breadList.value.length - 1;
	const isHome = route => route.name === "/";
	// 获取面包屑数据
	const getBreadcrumb = () => {
		if (route.meta.bread) {
			breadList.value = route.meta?.bread.split("/");
		} else {
			breadList.value = [];
		}
	};

	// 监听路由变化
	watch(() => route.path, getBreadcrumb, { immediate: true });
</script>
<style scoped lang="scss">
	.breadcrumb {
		margin-left: 10px;
		ul {
			display: flex;
			li {
				font-size: 13px;

				display: flex;
				align-items: center;
				.item-cl {
					padding: 10px 3px;
				}
				span {
					font-size: 13px;
				}

				i {
					margin: 0 7px;
					font-size: 13px;
				}
				.clickable {
					cursor: pointer;
					transition: color 0.2s ease;

					&:hover {
						color: var(--el-color-primary);
					}
				}
			}
		}
	}
</style>
