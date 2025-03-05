<!-- 顶部路由 -->
<template>
	<div class="menu">
		<!-- 一级菜单 -->
		<el-menu mode="horizontal" :ellipsis="false" :active-name="activeName" style="background: transparent">
			<el-menu-item
				style="margin-left: 10px"
				v-for="menu in menuStore().items"
				:key="menu.name"
				:name="menu.name"
				@mouseenter.native="handleMouseEnter(menu)"
				@mouseleave.native="handleMouseLeave"
				@click="handleMenuClick(menu)"
			>
				<!-- <i :type="menu.cOpImg" v-if="!menu.cOpImg?.includes('fa')" /> -->
				<!-- <i :class="menu.cOpImg"></i> -->
				{{ menu.title }}
			</el-menu-item>
		</el-menu>

		<!-- 二级和三级菜单下拉框 -->
		<transition name="slide-fade">
			<div v-show="showSubMenu && currentSubMenus.length" class="sub-menu-wrapper" @mouseenter="handleSubMenuEnter" @mouseleave="handleSubMenuLeave">
				<div class="sub-menu">
					<div class="sub-menu-group" v-for="subMenu in currentSubMenus" :key="subMenu.name">
						<div class="group-title">
							<!-- <Icon
                                :type="subMenu.cOpImg"
                                v-if="!subMenu.cOpImg?.includes('fa')"
                            /> -->
							<!-- <i :class="subMenu.cOpImg"></i> -->
							{{ subMenu.title }}
						</div>
						<div class="group-items">
							<div
								v-for="item in subMenu.children"
								:key="item.name"
								class="menu-item"
								:class="{
									active: activeSubItem == item.name || activeSubItem == item.menuPath
								}"
								@click="handleItemClick(item)"
							>
								<!-- <Icon :type="item.cOpImg" v-if="!item.cOpImg?.includes('fa')" /> -->
								<!-- <i :class="item.cOpImg"></i> -->
								{{ item.title }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
	import { ref, watch } from "vue";
	import { useRouter } from "vue-router";
	import { menuStore } from "@/store/menu";

	const router = useRouter();
	const activeName = ref("007001");
	const activeSubItem = ref("");
	const showSubMenu = ref(false);
	let hoverTimer = null;

	watch(
		() => router.currentRoute.value,
		route => {
			activeSubItem.value = route.meta.menuPath ? route.meta.menuPath : route.meta.menuName || route.meta.name;
		},
		{ immediate: true }
	);

	// 当前显示的子菜单
	const currentSubMenus = ref([]);

	// 处理鼠标进入一级菜单
	const handleMouseEnter = menu => {
		console.log("🚀 ~ topMenu.vue:84 ~ menu:", menu);
		if (hoverTimer) clearTimeout(hoverTimer);
		activeName.value = menu.name;
		currentSubMenus.value = menu?.children || [];
		showSubMenu.value = true;
		const dom = document.querySelector(".sub-menu");
		dom.scroll(0, 0);
	};

	// 处理鼠标离开一级菜单
	const handleMouseLeave = () => {
		hoverTimer = setTimeout(() => {
			showSubMenu.value = false;
			// activeName.value = "";
		}, 200);
	};

	// 处理鼠标进入子菜单
	const handleSubMenuEnter = () => {
		if (hoverTimer) clearTimeout(hoverTimer);
		showSubMenu.value = true;
	};

	// 处理鼠标离开子菜单
	const handleSubMenuLeave = () => {
		showSubMenu.value = false;
		activeName.value = "";
	};

	// 处理菜单项点击
	const handleItemClick = item => {
		console.log("🚀 ~ topMenu.vue:114 ~ item:", item);
		if (item.name) {
			activeSubItem.value = item.name;
			router.push("/" + item.name);
			showSubMenu.value = false;
		}
	};
	const handleMenuClick = item => {
		if (item.children && item.children.length > 0) {
			return;
		} else {
			activeSubItem.value = item.name;
			router.push("/" + item.name);
		}
	};
</script>

<style lang="scss" scoped>
	.menu {
		background: #f2f2f2;
		position: relative;
		:deep(.el-menu--horizontal) {
			height: 46px;
			border: 0;
		}
	}

	// 下拉框包装器
	.sub-menu-wrapper {
		position: absolute;
		left: 0;
		right: 0;
		top: 46px;
		background: #000911;
		opacity: 0.8;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		min-width: 400px;
	}

	// 子菜单内容区
	.sub-menu {
		max-height: 500px;
		overflow-y: auto;
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		// gap: 32px;

		// 自定义滚动条样式
		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-thumb {
			background: #ccc;
			border-radius: 3px;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		.sub-menu-group {
			width: 100%;
			margin-bottom: 5px;
			border-bottom: 1px solid #9d9d9d;
			&:last-of-type {
				border: 0;
			}
			.group-title {
				font-size: 16px;
				font-weight: 600;
				color: #fff;
				margin-bottom: 12px;
				display: flex;
				align-items: center;
				gap: 8px;

				i {
					font-size: 16px;
				}
			}

			.group-items {
				display: flex;
				// flex-direction: column;
				flex-wrap: wrap;
				justify-content: space-between;

				.menu-item {
					padding: 5px;
					cursor: pointer;
					border-radius: 4px;
					display: flex;
					align-items: center;
					gap: 8px;
					color: #fff;
					transition: all 0.3s;
					font-size: 13px;
					flex: 1 1 50%; /* 使每个子元素占据容器宽度的50%，即每行两个 */
					box-sizing: border-box; /* 确保padding和border不会影响宽度计算 */
					i {
						font-size: 13px;
					}

					&:hover {
						// background: #e8eaec;
						color: #2d8cf0;
					}

					&.active {
						// background: #2d8cf0;
						// color: #fff;
						color: #2d8cf0;
					}
				}
			}
		}
	}

	:deep(.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item) {
		border: 0;
	}
	:deep(.ivu-menu-light:after) {
		width: 0;
	}
	// 过渡动画
	.slide-fade-enter-active,
	.slide-fade-leave-active {
		transition: all 0.3s ease;
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateY(-10px);
		opacity: 0;
	}
</style>
