<template>
	<el-dialog
		v-model="modal"
		:title="title"
		:closable="false"
		:transfer="transfer"
		:mask-closable="false"
		:width="width"
		header-class="modal-header"
		body-class="modal-body"
		:draggable="draggable"
		:fullscreen="fullscreen"
		top="10vh"
		:show-close="false"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
	>
		<template v-slot:footer>
			<div class="footer">
				<div style="flex: 1" />
				<el-button @click="onCancel">{{ cancelText || "取消" }}</el-button>
				<el-button @click="onPreview" v-if="previewFlag">{{ previewText || "预览" }}</el-button>
				<el-button type="primary" @click="onOK" :disabled="okDisabled" :loading="loading" v-preventReClick v-if="showOk">
					{{ okText || "确定" }}
				</el-button>
			</div>
		</template>
		<slot></slot>
		<dt-info :label-width="labelWidth" ref="info" :opt="Opt" @change="onChange"></dt-info>
		<slot name="bottom"></slot>
	</el-dialog>
</template>

<script>
	import dt from "@/config/dt";
	export default {
		props: {
			width: Number,
			title: String,
			previewFlag: Boolean,
			previewText: String,
			cancelText: String,
			cancelTip: String,
			alwaysTip: Boolean,
			okText: String,
			loading: Boolean,
			labelWidth: Number,
			okDisabled: {
				type: Boolean,
				default: false
			},
			transfer: {
				type: Boolean,
				default: false
			},
			showOk: {
				type: Boolean,
				default: true
			},
			draggable: Boolean,
			fullscreen: Boolean
		},
		data() {
			return {
				modal: false,
				info: null,

				isEdit: false,
				Opt: null
			};
		},
		methods: {
			show(Opt, info) {
				this.modal = true;
				this.$nextTick(() => {
					if (Opt) {
						this.opt = Opt;
						this.info = info ? info : Opt.info;
						this.$refs.info.init(Opt, this.info);
					}
					this.$refs.info.update();
					setTimeout(() => {
						this.isEdit = false;
					}, 100);
				});
			},
			hide() {
				if (this.Opt) {
					this.$refs.info.clear();
				}
				this.$emit("cancelData"); //清理外部数据
				this.modal = false;
			},
			update(Opt) {
				this.Opt = Opt;
			},
			onCancel() {
				if (this.isEdit || this.alwaysTip) {
					dt.ui
						.messageBox({
							title: "提示",
							message: this.cancelTip || "是否放弃编辑内容？",
							type: "warning"
						})
						.then(res => {
							this.$emit("cancel", {
								...this.info
							});
							this.hide();
						})
						.catch(close => {});
				} else {
					this.hide();
				}
			},
			onOK() {
				if (this.Opt) {
					this.$refs.info.validate().then(res => {
						if (res) {
							this.$emit("ok", {
								...this.info
							});
						} else {
							console.warn("dt-model-edit", this.info);
						}
					});
				} else {
					this.$emit("ok", {
						...this.info
					});
				}
			},
			onPreview() {
				this.$refs.info.validate().then(res => {
					if (res) {
						this.$emit("onPreview", {
							...this.info
						});
					} else {
						console.warn("dt-model-edit", this.info);
					}
				});
			},
			onChange(data) {
				this.isEdit = true;
			}
		},
		directives: {
			preventReClick: {
				inserted(el, binding) {
					el.addEventListener("click", () => {
						if (!el.disabled) {
							el.disabled = true;
							setTimeout(() => {
								el.disabled = false;
							}, binding.value || 3000);
						}
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.footer {
		display: flex;
	}
</style>
