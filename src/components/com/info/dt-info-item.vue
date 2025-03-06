<template>
	<el-form-item
		v-if="!option.noDisplay"
		:style="{
			'margin-bottom': option.text || option.tag ? '10px' : ''
		}"
		:label="option.title + '：'"
		:prop="option.key"
		:rules="option.rules"
		:required="option.required"
		:id="option.uploadImg && option.uploadImg.setId ? option.uploadImg.setId : ''"
		:label-width="labelW"
	>
		<group v-if="option.group" ref="edit" :option="option" :info="info" @change="onChange"></group>
		<el-row style="width: 100%" :gutter="8" v-else>
			<el-col :span="24" style="box-sizing: content-box">
				<edit ref="edit" :option="option" :info="info" @change="onChange"></edit>
			</el-col>
		</el-row>
		<div :style="{ color: '#999', ...option.tipsStyle }" v-if="option.tip">
			{{ option.tip }}
		</div>
	</el-form-item>
</template>

<script>
	import edit from "./edit/dt-info-edit.vue";
	import group from "./edit/dt-info-edit-group.vue";
	export default {
		components: {
			edit,
			group
		},
		computed: {
			labelW() {
				return this.option.labelWidth ? this.option.labelWidth : this.option.title ? null : 20;
			}
		},
		watch: {
			option: {
				handler(n) {
					this.required = null;
					let req = n.rules && n.rules.some(i => i.required);
					if (this.lastRequired && !req) {
						this.required = false;
						setTimeout(() => {
							this.required = null;
						}, 100);
					}
					this.lastRequired = req;
					this.fillGroup();
				},
				deep: true
			}
		},
		props: {
			option: Object,
			info: Object
		},
		data() {
			return {
				required: null,
				lastRequired: null
			};
		},
		methods: {
			clear() {
				let edits = this.$refs.edit;
				if (edits) {
					if (edits.constructor === Array) {
						for (let item of edits) {
							item.clear();
						}
					} else {
						edits.clear();
					}
				}
			},
			update() {
				let edits = this.$refs.edit;
				if (edits) {
					if (edits.constructor === Array) {
						for (let item of edits) {
							item.update();
						}
					} else {
						edits.update();
					}
				}
			},
			onChange(data) {
				this.$emit("change", data);
			},
			fillGroup() {
				if (this.option.group) {
					this.option.group.forEach(opt => {
						opt.ruleKey = this.option.key;
					});
				}
			}
		},
		mounted() {
			this.fillGroup();
		}
	};
</script>

<style lang="scss" scoped>
	.content {
	}
	:deep(.el-form-item__content) {
		// width: 100%;
	}
</style>
