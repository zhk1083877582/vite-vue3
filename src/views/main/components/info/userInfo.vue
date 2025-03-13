<template>
	<!-- 用户头像、菜单 -->
	<div class="user btn">
		<el-popover
			ref="userMenuPopover"
			placement="bottom-end"
			:width="100"
			:hide-after="0"
			:offset="20"
			trigger="click"
			popper-class="user-menu-popover"
		>
			<template #reference>
				<el-icon><UserFilled /></el-icon>
			</template>
			<template #default>
				<div class="user-menu-box">
					<ul class="user-menu">
						<li @click="changePasswordFun">
							<el-icon class="menu-icon iconfont-sys"><Edit /></el-icon>
							<span class="menu-txt">修改密码</span>
						</li>
						<li @click="logout">
							<el-icon class="menu-icon iconfont-sys"><SwitchButton /></el-icon>
							<span class="menu-txt">退出登录</span>
						</li>
					</ul>
				</div>
			</template>
		</el-popover>
	</div>
	<change-password ref="changePasswordRef" />
</template>

<script setup>
	import dt from "@/config/dt";
	import router from "@/router";
	import changePassword from "./changePassword/index.vue";
	const [changePasswordRef] = [ref()];
	const logout = () => {
		dt.session.remove("dt_auth");
		router.replace("/login");
	};
	function changePasswordFun() {
		changePasswordRef.value.show();
	}
</script>

<style lang="scss" scoped>
	@use "./index.scss";
</style>
