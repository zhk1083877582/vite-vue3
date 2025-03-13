<template>
	<div class="info-warp">
		<div class="btn-box">
			<div class="btn setting-btn" style="cursor: pointer; line-height: 46px" @click="choiceType">
				<el-icon size="20"><Setting /></el-icon>
			</div>
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
					popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: calc(var(--custom-radius) / 2 + 4px); padding: 5px 16px; 5px 16px;"
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
		</div>
		<div style="display: flex; width: 200px">
			<el-select v-model="userInfoOrg" style="align-self: center" size="default">
				<el-option v-for="item in options" :key="item.key" :label="item.value" :value="item.key"> </el-option>
			</el-select>
		</div>

		<change-password ref="changePasswordRef" />
	</div>
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
	const choiceType = () => {
		dt.notify.emit("openSetting");
	};
	let userInfoOrg = ref(1);
	const options = ref([
		{
			key: 1,
			value: "总公司"
		},
		{
			key: 2,
			value: "山东分公司"
		}
	]);
	function changePasswordFun() {
		changePasswordRef.value.show();
	}
	onMounted(() => {});
</script>

<style lang="scss" scoped>
	.info-warp {
		display: flex;
		line-height: 40px;
		padding: 0 10px;
	}

	.btn-box {
		display: flex;
		.btn {
			display: block;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 46px;
			height: 46px;
			line-height: 46px;
			text-align: center;
			cursor: pointer;
			border-radius: 6px;
			transition: all 0.2s;

			i {
				display: block;
				font-size: 19px;
				color: #78829d;
			}
			&.setting-btn:hover {
				i {
					animation: rotate180 0.5s;
				}
			}
		}
	}
	@keyframes rotate180 {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(180deg);
		}
	}

	.user-menu-popover {
		.user-menu-box {
			.user-head {
				display: flex;
				align-items: center;

				.cover {
					width: 40px;
					height: 40px;
					margin: 0 10px 0 0;
					overflow: hidden;
					background: #eee;
					border-radius: 50%;
				}
			}

			.user-menu {
				li {
					display: flex;
					align-items: center;
					padding: 5px;
					margin-bottom: 10px;
					cursor: pointer;
					user-select: none;
					border-bottom: 1px solid #e0e0e0;

					&:last-of-type {
						margin-bottom: 0;
						border-bottom: 0;
					}

					i {
						display: block;
						width: 25px;
						font-size: 16px;
						color: var(--art-gray-800);
					}

					span {
						font-size: 14px;
						color: #000;
					}

					&:hover {
						background-color: var(--art-gray-200);
					}
				}
			}
		}
	}
</style>
