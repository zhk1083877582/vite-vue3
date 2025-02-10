<template>
	<dt-modal-edit ref="editRef" :title="info.title" @ok="onOk" :width="850" :previewFlag="info.previewFlag" @onPreview="onPreview">
		<div v-if="info.tips" style="background: #fefcec; padding: 10px; display: flex; margin-bottom: 10px">
			<el-icon :size="20" color="#2f64f4"><Warning /></el-icon>
			<div style="margin-left: 10px">
				{{ info.tips }}
			</div>
		</div>
		<div class="transfer-box">
			<div class="data-box">
				<div class="data-box-title">
					<input :disabled="unselected.length == 0" type="checkbox" id="unselectedLabel" @click="toggleAll(0)" :checked="selectedAllStatus(0)" />
					<label for="unselectedLabel"> {{ info.leftText ? info.leftText : "未在表头中显示" }}({{ unselected.length }}) </label>
				</div>
				<div class="data-content">
					<ul>
						<li v-for="(item, index) in unselected" :key="index">
							<input type="checkbox" :disabled="item.disabled" :id="item.fieldValue + index" v-model="item.isSelected" />
							<label :for="item.fieldValue + index">{{ item.fieldValue }}</label>
						</li>
					</ul>
				</div>
			</div>
			<div class="btn-box">
				<div class="btn-box-center">
					<span @click="toTarget" :class="[unselected.length != 0 && sourceRefNum != 0 ? 'active' : 'disabled', 'ty-transfer-btn-toright to-switch']">
						<!-- <el-button type="primary" >
							<Icon type="ios-arrow-forward" />
						</el-button> -->
						<el-button type="primary" :disabled="unselected.length != 0 && sourceRefNum != 0 ? false : true" :icon="ArrowRightBold" circle />
					</span>
					<span @click="toSource" :class="[selected.length != 0 && targetRefNum != 0 ? 'active' : 'disabled', 'ty-transfer-btn-toleft to-switch']">
						<!-- <el-button type="primary" :disabled="selected.length != 0 && targetRefNum != 0 ? false : true">
							<Icon type="ios-arrow-back" />
						</el-button> -->
						<el-button type="primary" :disabled="selected.length != 0 && targetRefNum != 0 ? false : true" :icon="ArrowLeftBold" circle />
					</span>
				</div>
			</div>
			<div class="data-box">
				<div class="data-box-title">
					<input :disabled="selected.length == 0" type="checkbox" id="selectedLabel" @click="toggleAll(1)" :checked="selectedAllStatus(1)" />
					<label for="selectedLabel"> {{ info.rightText ? info.rightText : "已在表头中显示" }} ({{ selected.length }}) </label>
				</div>
				<div class="data-content">
					<ul>
						<li v-for="(item, index) in selected" :key="index">
							<input type="checkbox" :disabled="item.disabled" :class="item.disabled ? 'not-cursor' : ''" :id="item.fieldValue + index" v-model="item.isSelected" />
							<label :for="item.fieldValue + index" :class="[item.disabled ? 'not-cursor' : '']">
								{{ item.fieldValue }}
							</label>
							<div class="upDown" v-if="!item.disabled">
								<span>
									<em @click="upItems(index)" :class="[selected.length != 0 && targetRefNum != 0 ? 'active' : 'disabled', 'ty-transfer-btn-totop to-switch']">
										<!-- <Icon type="md-arrow-round-up" :disabled="true" size="20" :color="index == disabledNum ? '#c5c8ce' : '#2D61F4'" /> -->
										<el-icon :disabled="true" size="20" :color="index == disabledNum ? '#c5c8ce' : '#2D61F4'"><SortUp /></el-icon>
									</em>
									<em @click="downItems(item, index)" :class="[selected.length != 0 && targetRefNum != 0 ? 'active' : 'disabled', 'ty-transfer-btn-tobottom to-switch']">
										<!-- <Icon type="md-arrow-round-down" size="20" :color="index == selected.length - 1 ? '#c5c8ce' : 'red'" />
                      -->
										<el-icon size="20" :color="index == selected.length - 1 ? '#c5c8ce' : 'red'"><SortDown /></el-icon>
									</em>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</dt-modal-edit>
</template>
<script setup>
	import { ref, reactive, computed } from "vue";
	import { ArrowRightBold, ArrowLeftBold } from "@element-plus/icons-vue";
	import dt from "@/config/dt";
	const [editRef] = [ref()];
	let info = reactive({
		title: "调整表头排序",
		previewFlag: false
	});
	const emits = defineEmits(["success"]);

	let [unselected, selected] = [ref([]), ref([])];
	// 不可编辑项
	const disabledNum = computed(() => {
		return selected.value.filter(item => item.disabled).length;
	});
	// 源数据中选中的数量
	const sourceRefNum = computed(() => {
		return unselected.value.filter(item => item.isSelected).length;
	});
	// 目标数据中选中的数量
	const targetRefNum = computed(() => {
		return selected.value.filter(item => item.isSelected).length;
	});
	// 选择的源记录数量
	const selectSourceItemNumber = computed(() => {
		return unselected.value.filter(item => item.isSelected).length;
	});
	// 选择目标记录数量
	const selectTargetItemNumber = computed(() => {
		return selected.value.filter(item => item.isSelected).length;
	});
	function show(data) {
		console.log("🚀 ~ index.vue:99 ~ show ~ data:", data);
		info = Object.assign(info, data);
		unselected.value = dt.tool.deepClone(data?.unselected) || [];
		selected.value = dt.tool.deepClone(data?.selected) || [];
		editRef.value.show();
	}
	function onOk() {
		console.log("🚀 ~ index.vue:112 ~ onOk ~ onOk:");
		// 获取表头排序
		emits("success", {
			unselected: unselected.value,
			selected: selected.value
		});
		editRef.value.hide();
	}
	function onPreview() {}
	// 全选状态 所有项选中自动勾选顶部check
	function selectedAllStatus(type) {
		let disabledLen = selected.value.filter(item => item.disabled).length; // 禁用项
		if (type == 0) {
			if (selectSourceItemNumber.value === unselected.value.length && selectSourceItemNumber.value !== 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if (selectTargetItemNumber.value + disabledLen != selected.value.length) {
				return false;
			} else {
				return true;
			}
		}
	}
	// 全选及反选
	function toggleAll(type) {
		if (type == 0) {
			let len = unselected.value.length;
			let slen = unselected.value.filter(item => item.isSelected).length;
			if (len != slen) {
				unselected.value.map(item => (item.isSelected = item.disabled ? false : true));
			} else {
				unselected.value.map(item => (item.isSelected = false));
			}
		} else {
			let len = selected.value.length; // 未选中
			let slen = selected.value.filter(item => item.isSelected).length; //已选中
			let disabledLen = selected.value.filter(item => item.disabled).length; // 禁用项
			if (len != slen + disabledLen) {
				selected.value.map(item => {
					if (!item.disabled) {
						item.isSelected = true;
					}
				});
			} else {
				selected.value.map(item => (item.isSelected = false));
			}
		}
	}

	// 上移
	function upItems(index) {
		if (index > disabledNum.value) {
			let update = selected.value[index - 1];
			selected.value.splice(index - 1, 1);
			selected.value.splice(index, 0, update);
		} else {
			dt.ui.Message.warning("已不可上移!");
		}
	}
	// 下移
	function downItems(item, index) {
		if (index + 1 != selected.value.length) {
			let downdate = selected.value[index + 1];
			selected.value.splice(index + 1, 1);
			selected.value.splice(index, 0, downdate);
		} else {
			dt.ui.Message.warning("已经是最后一条，不可下移!");
		}
	}
	function exchange(fd, td) {
		let selectedItem = fd
			.filter(item => item.isSelected)
			.map(item => {
				return {
					...item,
					isSelected: false
				};
			});
		td.push(...selectedItem);
		var selectedlist = fd.filter(item => !item.isSelected);
		return selectedlist;
	}

	// 把选择数据转移到目标（右框）
	function toTarget() {
		unselected.value = exchange(unselected.value, selected.value);
	}
	// 把选择数据转回到源（左框）
	function toSource() {
		selected.value = exchange(selected.value, unselected.value);
	}
	defineExpose({
		show
	});
</script>
<style lang="scss" scoped>
	.transfer-box {
		width: 100%;
		max-height: 500px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.data-box {
			flex: 3;

			.data-box-title {
				background: #f9fafc;
				margin: 0;
				line-height: normal;
				padding: 7px 16px;
				clear: both;
				color: #515a6e;
				font-size: 14px !important;
				white-space: nowrap;
				list-style: none;
				border: 1px solid #e8eaec;
				border-bottom: 0px;
				cursor: pointer;

				label {
					margin: 0 4px;
					vertical-align: 2px;
					font-size: 15px;
				}
			}

			.data-content {
				max-height: 400px;
				height: 400px;
				overflow-y: auto;
				border: 1px solid #e8eaec;
				border-top: 0px;

				ul > li {
					margin: 0;
					line-height: normal;
					padding: 7px 16px;
					clear: both;
					color: #515a6e;
					font-size: 14px !important;
					white-space: nowrap;
					list-style: none;
					display: flex;
					flex-direction: row;
					position: relative;

					input {
						margin-top: 1px;
						cursor: pointer;
					}

					label {
						margin: 0 4px;
						cursor: pointer;
						min-width: 120px;
					}

					.upDown {
						position: absolute;
						right: 5px;
						cursor: pointer;
					}
				}
			}
		}
		.btn-box {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			max-height: 500px;

			.btn-box-center {
				display: flex;
				flex-direction: column;
				align-items: center;

				span {
					margin: 10px;
				}
			}
		}
		.not-cursor {
			color: #c5c8ce;
			cursor: not-allowed !important;
		}
		.color-blue {
			color: #2d61f4;
		}
	}
</style>
