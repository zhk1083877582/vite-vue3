import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule.js";
import cityOpt from "@/option/city.js";

export class reportMsgOpt extends Opt {
	constructor(vm) {
		super(vm);
		this.info = this.infoData;
	}

	create() {
		return [
			{
				title: "无资料报案编号",
				key: "key1",
				disabled: true,
				input: {},
				placeholder: "保存后自动生成"
			},
			{
				title: "赔案号",
				key: "key2",
				disabled: true,
				input: {},
				placeholder: "保存后自动生成"
			},
			{
				title: "报案时间",
				key: "key3",
				disabled: true,
				date: {
					type: "datetime",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				title: "赔案案件类别",
				key: "key4",
				select: {
					options: [
						{ key: 1, value: "本地查勘" },
						{ key: 2, value: "异地查勘" }
					]
				},
				rules: [ruleOpt.required("请选择赔案案件类别")]
			},
			{
				title: "报案方式",
				key: "key5",
				select: {
					options: [
						{ key: 1, value: "本地查勘" },
						{ key: 2, value: "异地查勘" }
					]
				}
			},
			{
				title: "报案人Email",
				key: "key6",
				input: {},
				placeholder: "请输入报案人Email"
			},
			{
				title: "调度方式",
				key: "key7",
				select: {
					options: [
						{ key: 1, value: "本地查勘" },
						{ key: 2, value: "异地查勘" }
					]
				},
				rules: [ruleOpt.required("请选择调度方式")]
			},
			{
				title: "报案人类别",
				key: "key8",
				select: {
					options: [
						{ key: 1, value: "本地查勘" },
						{ key: 2, value: "异地查勘" }
					]
				}
			},
			{
				title: "报案人姓名",
				key: "key9",
				input: {},
				placeholder: "请输入报案人姓名",
				rules: [ruleOpt.required("请输入报案人姓名")]
			},
			{
				title: "报案人电话",
				key: "key10",
				input: {},
				placeholder: "请输入报案人电话",
				rules: [ruleOpt.required("请输入报案人电话")]
			},
			{
				title: "与被保人关系",
				key: "key11",
				select: {
					options: [
						{ key: 1, value: "本地查勘" },
						{ key: 2, value: "异地查勘" }
					]
				},
				rules: [ruleOpt.required("请选择与被保人关系")]
			},
			{
				title: "联系人姓名",
				key: "key12",
				input: {},
				placeholder: "请输入联系人姓名"
			},
			{
				title: "联系人电话",
				key: "key13",
				input: {},
				placeholder: "请输入联系人电话"
			}
		];
	}
}

export class dangerMsgOpt extends Opt {
	constructor(vm) {
		super(vm);
		this.info = this.infoData;
	}
	catastropheList(info) {
		let code = reactive({
			title: "巨灾代码",
			key: "key9",
			disabled: info.key8 == 2,
			placeholder: info.key8 == 2 ? "" : "请选择",
			select: {
				clearable: true,
				options: [
					{ key: 1, value: "巨灾1" },
					{ key: 2, value: "巨灾2" }
				]
			},
			rules: info.key8 == 2 ? [] : [ruleOpt.required("巨灾代码 不能为空!")]
		});
		let iscatastrophe = reactive({
			title: "是否巨灾",
			key: "key8",
			select: {
				options: [
					{ key: 1, value: "是" },
					{ key: 2, value: "否" }
				]
			},
			change: val => {
				val.info.key9 = "";
				this.dangerMsgFn.resetField(["key9"]);
				if (val.value == 1) {
					code.disabled = false;
					code.placeholder = "请选择";
					code.rules = [ruleOpt.required("巨灾代码 不能为空!")];
				} else {
					code.disabled = true;
					code.placeholder = "";
					code.rules = [];
				}
			},
			rules: [ruleOpt.required("是否巨灾 不能为空!")]
		});
		return [iscatastrophe, code];
	}
	create() {
		return [
			{
				title: "报损金额",
				key: "key1",
				disabled: true,
				input: { type: "number" },
				placeholder: ""
			},
			{
				title: "报损币种",
				key: "key2",
				placeholder: "",
				disabled: true,
				select: {
					options: [
						{
							label: "人民币",
							key: "01"
						},
						{
							label: "港币",
							key: "02"
						},
						{
							label: "美元",
							key: "03"
						},
						{
							label: "英镑",
							key: "04"
						},
						{
							label: "日元",
							key: "05"
						},
						{
							label: "加拿大元",
							key: "10"
						},
						{
							label: "新台币",
							key: "11"
						},
						{
							label: "欧元",
							key: "12"
						},
						{
							label: "科币",
							key: "18"
						},
						{
							label: "印度卢比",
							key: "19"
						},
						{
							label: "阿拉伯联合酋长国迪拉姆",
							key: "43"
						},
						{
							label: "新加坡元",
							key: "44"
						},
						{
							label: "韩元",
							key: "97"
						}
					]
				},
				rules: [ruleOpt.required("报损币种不能为空")]
			},
			{
				title: "报案出险时间",
				key: "key3",
				disabled: true,
				date: {
					type: "datetime",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				title: "报案险因类型",
				key: "key4",
				select: {
					options: [
						{
							value: "自然灾害",
							key: "01501"
						},
						{
							value: "意外事故",
							key: "01502"
						},
						{
							value: "人为因素",
							key: "01503"
						},
						{
							value: "法律责任",
							key: "01504"
						},
						{
							value: "其他",
							key: "01505"
						}
					]
				},
				rules: [ruleOpt.required("报案险因类型 不能为空!")]
			},
			{
				title: "报案出险原因",
				key: "key5",
				select: {
					options: [
						{ key: 1, value: "出险原因1" },
						{ key: 2, value: "出险原因2" }
					]
				},
				rules: [ruleOpt.required("报案出险原因 不能为空!")]
			},
			{
				title: "是否人伤",
				key: "key6",
				select: {
					options: [
						{ key: 1, value: "是" },
						{ key: 2, value: "否" }
					]
				}
			},
			{
				title: "人数",
				key: "key7",
				input: { type: "number" }
			},

			...this.catastropheList(this.infoData),

			{
				title: "报案出险地点",
				col: 24,
				key: "key10",
				input: {},
				placeholder: "请输入报案出险地点",
				rules: [ruleOpt.required(" 报案出险地点 不能为空!")]
			},
			{
				title: "报案出险经过",
				col: 24,
				key: "key11",
				input: { type: "textarea" },
				placeholder: "请输入报案出险经过",
				rules: [ruleOpt.required(" 报案出险经过 不能为空!")]
			},
			{
				title: "施救过程",
				col: 24,
				key: "key12",
				input: { type: "textarea" },
				placeholder: "请输入报案出险地点"
			},
			{
				title: "备注",
				col: 24,
				key: "key13",
				input: { type: "textarea" },
				placeholder: "请输入备注"
			}
		];
	}
}

export class designeeMsgOpt extends Opt {
	constructor(vm) {
		super(vm);
	}
	create() {
		return [
			{
				title: "调度员名称",
				key: "name",
				groupNum: "0",
				xl: 12,
				group: [
					{
						key: "name",
						placeholder: "请选择",
						col: 12,
						disabled: true,
						input: {}
					},
					{
						col: 4,
						disabled: true,
						button: {
							icon: "Search",
							style: {
								width: "100%",
								height: "100%"
							},
							click: () => {
								this.showOrgModal();
							}
						}
					}
				],
				rules: [ruleOpt.required("调度员名称 不能为空!")]
			}
		];
	}
}
