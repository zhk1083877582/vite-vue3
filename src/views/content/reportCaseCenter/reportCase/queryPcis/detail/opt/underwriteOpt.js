import { Opt } from "@/components/com/Opt.js";
import ruleOpt from "@/option/rule.js";
import cityOpt from "@/option/city.js";

export class underwriteMsgOpt extends Opt {
	constructor(vm) {
		super(vm);
		this.info = this.infoData;
	}

	create() {
		return [
			{
				title: "保单号",
				key: "key1",
				disabled: true,
				input: {},
				placeholder: ""
			},
			{
				title: "保险起期",
				key: "key2",
				disabled: true,
				date: {
					type: "datetime",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				title: "保险止期",
				key: "key3",
				disabled: true,
				date: {
					type: "datetime",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				title: "保险金额",
				key: "key4",
				disabled: true,
				input: { type: "number" },
				placeholder: ""
			},
			{
				title: "金额币种",
				key: "key5",
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
				}
			},
			{
				title: "续保标志",
				key: "key6",
				placeholder: "",
				disabled: true,
				select: {
					options: [
						{
							label: "新保",
							key: "01"
						}
					]
				}
			},
			{
				title: "共保业务",
				key: "key7",
				placeholder: "",
				disabled: true,
				select: {
					options: [
						{
							label: "非共保业务",
							key: "01"
						}
					]
				}
			},
			{
				title: "分入标志",
				key: "key8",
				placeholder: "",
				disabled: true,
				select: {
					options: [
						{ key: 1, value: "是" },
						{ key: 2, value: "否" }
					]
				}
			},
			{
				title: "临分标志",
				key: "key9",
				placeholder: "",
				disabled: true,
				select: {
					options: [
						{ key: 1, value: "是" },
						{ key: 2, value: "否" }
					]
				}
			},
			{
				title: "客户等级",
				key: "key10",
				placeholder: "",
				disabled: true,
				input: {}
			},
			{
				title: "单类型",
				key: "key11",
				placeholder: "",
				disabled: true,
				input: {}
			}
		];
	}
}

export class costColumn extends Opt {
	constructor(fun) {
		super(fun);
	}
	create() {
		return [
			{
				field: "orgName",
				title: "期次",
				minWidth: 150
			},
			{
				field: "workNo",
				title: "付款人名称",
				minWidth: 150
			},
			{
				field: "times",
				minWidth: 150,
				title: "缴费金额"
			},
			{
				field: "userName",
				title: "损失名称",
				minWidth: 150
			},
			{
				field: "times",
				minWidth: 150,
				title: "缴费方式"
			},
			{
				field: "times",
				minWidth: 150,
				title: "实缴金额"
			},
			{
				field: "times",
				minWidth: 150,
				title: "保险止期"
			}
		];
	}
}

export class reinsuranceColumn extends Opt {
	constructor(fun) {
		super(fun);
	}
	create() {
		return [
			{
				field: "key1",
				title: "风险单位序号",
				minWidth: 180
			},
			{
				field: "key2",
				title: "风险单位名称",
				minWidth: 200
			},
			{
				field: "key3",
				minWidth: 200,
				title: "自留比例"
			}
		];
	}
}
