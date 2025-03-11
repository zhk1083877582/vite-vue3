<template>
	<div class="setting">
		<el-drawer
			size="300px"
			v-model="showDrawer"
			:lock-scroll="false"
			:with-header="false"
			:before-close="closeDrawer"
			@open="toggleDrawer(true)"
			@close="toggleDrawer(false)"
			modal-class="setting-modal"
		>
			<p class="title" style="margin-top: 30px">菜单布局</p>
			<div class="menu-type">
				<el-scrollbar :horizontal="true">
					<div class="menu-type-wrap">
						<!-- 左侧菜单 -->
						<div class="item">
							<div class="box bl" :class="{ 'is-active': isLeftMenu }" @click="setMenuType('LEFT')">
								<div class="bl-menu">
									<div class="line" v-for="i in 6" :key="i"></div>
								</div>
								<div class="bl-content">
									<div class="header"></div>
									<div class="row1">
										<div v-for="i in 2" :key="i"></div>
									</div>
									<div class="row2"></div>
								</div>
							</div>
							<span class="name">垂直</span>
						</div>
						<!-- 顶部菜单 -->
						<div class="item">
							<div class="box bt" :class="{ 'is-active': isTopMenu }" @click="setMenuType('TOP')">
								<div class="bt-menu">
									<div class="line" v-for="i in 6" :key="i"></div>
								</div>
								<div class="bl-content">
									<div class="row1">
										<div v-for="i in 2" :key="i"></div>
									</div>
									<div class="row2"></div>
								</div>
							</div>
							<span class="name">水平</span>
						</div>
					</div>
				</el-scrollbar>
			</div>

			<p class="title" style="margin-top: 30px">系统主题色</p>
			<div class="main-color-wrap">
				<div class="offset">
					<div v-for="color in mainColor" :key="color" :style="{ background: `${color} !important` }" @click="setElementTheme(color)">
						<el-icon class="Check" v-show="color == systemThemeColor"><Select /></el-icon>
					</div>
				</div>
			</div>
		</el-drawer>
	</div>
</template>
<script setup>
	import dt from "@/config/dt";
	import { settingStore } from "@/store/setting";

	const isLeftMenu = computed(() => settingStore().menuType == "LEFT");
	const isTopMenu = computed(() => settingStore().menuType == "TOP");
	const systemThemeColor = computed(() => settingStore().systemThemeColor);
	const mainColor = computed(() => settingStore().SystemMainColor);
	const showDrawer = ref(false);
	// 打开或关闭抽屉
	const toggleDrawer = open => {
		let el = document.getElementsByTagName("body")[0];
		if (open) {
			setTimeout(() => {
				el.setAttribute("class", "theme-change");
			}, 500);
		} else {
			el.removeAttribute("class");
		}
	};
	const closeDrawer = () => {
		showDrawer.value = false;
	};
	const openSetting = () => {
		console.log(123123);
		showDrawer.value = true;
	};

	const setMenuType = type => {
		settingStore().setMenuType(type);
	};

	const setElementTheme = color => {
		settingStore().setElementTheme(color);
	};

	onMounted(() => {
		dt.notify.on("openSetting", () => openSetting());
	});
</script>
<style scoped lang="scss">
	@use "./style";
</style>
