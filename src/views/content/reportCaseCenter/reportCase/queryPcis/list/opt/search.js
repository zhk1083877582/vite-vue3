import { Opt } from "@/components/com/Opt.js";
// import rolesOpt from "@/option/roles.js";
// import organApi from "@/biz/organization";

export class searchOpt extends Opt {
	create() {
		let part1 = reactive({
			title: "产品",
			key: "key3",
			placeholder: "请选择",
			select: {
				options: []
			},
			load: o => {
				o.select.options = [];
			}
		});
		return [
			{
				title: "理赔机构",
				key: "orgId",
				groupNum: "0",
				xl: 12,
				group: [
					{
						key: "orgId",
						placeholder: "请选择",
						col: 12,
						disabled: true,
						select: {
							options: [],
							maxTagCount: 1
						},
						load: o => {
							o.select.options = this.getOrglist();
						}
					},
					{
						col: 4,
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
					},
					{
						col: 8,
						key: "isAll",
						checkbox: {
							options: [{ key: 1, value: "是否包含下级" }]
						},
						change: val => {
							console.log("🚀 ~ search.js:58 ~ create ~ val:", val);
						},
						style: {
							marginLeft: "40px"
						}
					}
				]
			},
			{
				title: "险类代码",
				key: "key1",
				placeholder: "请输入",
				placeholder: "请选择",
				select: {
					clearable: true,
					options: []
				},
				load: o => {
					o.select.options = [
						{ key: 1, value: "企业财产险" },
						{ key: 2, value: "货物运输险" }
					];
				},
				change: val => {
					console.log("🚀 ~ search.js:68 ~ create ~ val:", val);
					if (val.value) {
						part1.select.options = [
							{
								value: "020002 出口货运险",
								key: "020002"
							},
							{
								value: "020006 进口货运险",
								key: "020006"
							},
							{
								value: "020009 国内货物运输保险",
								key: "020009"
							},
							{
								value: "020020 国内物流综合保险",
								key: "020020"
							},
							{
								value: "020025 公路货物运输定额保险",
								key: "020025"
							},
							{
								value: "020027 新能源商业保险",
								key: "020027"
							}
						];
					} else {
						part1.select.options = [];
						val.info.key3 = "";
					}
				}
			},
			part1,
			{
				title: "投保人名称",
				key: "key4",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "投保人证件号",
				key: "key5",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "被保人名称",
				key: "key6",
				placeholder: "请输入",
				input: {}
			},
			{
				key: "key7",
				title: "被保人证件号",
				placeholder: "请输入",
				input: {}
			},
			{
				key: "key8",
				title: "保险起期",
				placeholder: "清选择",
				date: {
					type: "daterange",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				key: "key9",
				title: "保单号",
				placeholder: "请输入",
				input: {}
			},
			{
				key: "key10",
				title: "出险时间",
				placeholder: "清选择",
				date: {
					type: "datetime",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			}
		];
	}
}
