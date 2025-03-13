import { Opt } from "@/components/com/Opt.js";
// import rolesOpt from "@/option/roles.js";
// import organApi from "@/biz/organization";

export class searchOpt extends Opt {
	create() {
		return [
			{
				title: "理赔机构",
				key: "orgId1",
				groupNum: "0",
				group: [
					{
						key: "orgId1",
						placeholder: "请选择",
						col: 20,
						disabled: true,
						select: {
							options: [],
							maxTagCount: 1
						},
						load: o => {
							o.select.options = this.optionsList.orgList1;
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
								this.showOrgModal({ key: "orgId1", listFlag: "orgList1" });
							}
						}
					}
				]
			},
			// {
			//   title: "理赔机构",
			//   key: "orgId1",
			//   groupNum: '0',
			//   group: [
			//     {
			//       key: "orgId1",
			//       placeholder: "请选择",
			//       col: 20,
			//       disabled: true,
			//       select: {
			//         options: [],
			//         maxTagCount: 1,
			//       },
			//       load: (o) => {
			//         o.select.options = this.optionsList.orgList1
			//       },
			//     }, {
			//       col: 4,
			//       button: {
			//         icon: 'Search',
			//         style: {
			//           width: '100%',
			//           height: "100%"
			//         },
			//         click: () => {
			//           this.showOrgModal({ key: 'orgId1', listFlag: 'orgList1' })
			//         }
			//       }
			//     }
			//   ]
			// },
			{
				title: "产品",
				key: "key1",
				placeholder: "请输入",
				group: [
					{
						key: "key1",
						placeholder: "请选择",
						col: 12,
						select: {
							options: []
						},
						load: o => {
							o.select.options = [];
						}
					},
					{
						key: "key2",
						placeholder: "请选择",
						col: 12,
						select: {
							options: []
						},
						load: o => {
							o.select.options = [];
						}
					}
				]
			},
			{
				title: "结案类型",
				key: "key3",
				placeholder: "请选择",
				col: 12,
				select: {
					options: []
				},
				load: o => {
					o.select.options = [];
				}
			},
			{
				title: "被保人",
				key: "key4",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "投保人",
				key: "key5",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "保单号",
				key: "key6",
				placeholder: "请输入",
				input: {}
			},
			{
				key: "key7",
				title: "理算时间",
				placeholder: "清选择",
				date: {
					type: "daterange",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				key: "key8",
				title: "出险时间",
				placeholder: "清选择",
				date: {
					type: "daterange",
					valueFormat: "YYYY-MM-DD HH:mm:ss"
				}
			},
			{
				title: "赔案号",
				key: "key9",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "报案号",
				key: "key10",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "立案号",
				key: "key11",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "结案号",
				key: "key12",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "被保人证件号码",
				key: "key13",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "投保人证件号码",
				key: "key14",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "出险人名称",
				key: "key15",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "出险人证件号码",
				key: "key16",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "出险人名称",
				key: "key17",
				placeholder: "请输入",
				input: {}
			},
			{
				title: "承保机构",
				key: "orgId2",
				groupNum: "0",
				group: [
					{
						key: "orgId2",
						placeholder: "请选择",
						col: 20,
						disabled: true,
						select: {
							options: [],
							maxTagCount: 1
						},
						load: o => {
							o.select.options = this.optionsList.orgList2;
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
								this.showOrgModal({ key: "orgId2", listFlag: "orgList2" });
							}
						}
					}
				]
			},
			{
				key: "key18",
				title: "赔案状态",
				placeholder: "清选择",
				select: {
					options: [
						{ key: "1", value: "状态1" },
						{ key: "2", value: "状态2" }
					]
				}
			},
			{
				key: "key19",
				title: "理算提交人员",
				placeholder: "清选择",
				select: {
					options: [
						{ key: "1", value: "状态1" },
						{ key: "2", value: "状态2" }
					]
				}
			},
			{
				key: "key20",
				title: "共保标志",
				placeholder: "清选择",
				select: {
					options: [
						{ key: "1", value: "共保标志1" },
						{ key: "2", value: "共保标志2" }
					]
				}
			},
			{
				key: "key21",
				title: "报案渠道",
				placeholder: "清选择",
				select: {
					options: [
						{ key: "1", value: "报案渠道1" },
						{ key: "2", value: "报案渠道2" }
					]
				}
			},
			{
				key: "key22",
				title: "报案时间",
				placeholder: "清选择",
				date: {
					type: "date",
					valueFormat: "YYYY-MM-DD"
				}
			}
		];
	}
}
