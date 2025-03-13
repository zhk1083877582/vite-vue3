import { Opt } from "@/components/com/Opt.js";

export class listColumn extends Opt {
	constructor(fun) {
		super(fun);
	}
	create() {
		return [
			{
				title: "序号",
				minWidth: 50,
				type: "index",
				fixed: "left"
			},
			{
				field: "orgName",
				title: "所属组织",
				minWidth: 150,

				cell: info => {
					return {
						img: {
							src: info.sealUrl,
							click: () => {
								this.preview(info.sealUrl);
							}
						}
					};
				}
			},
			{
				field: "workNo",
				title: "工号",
				minWidth: 90
			},
			{
				field: "times",
				minWidth: 160
			},
			{
				field: "userName",
				title: "姓名",
				minWidth: 100
			},
			{
				field: "phone",
				title: "手机号",
				minWidth: 120
			},
			{
				field: "roleNames",
				title: "角色",
				minWidth: 110,
				sort: {
					key: "clockCountSort",
					asc: 1,
					desc: 2
				}
			},
			{
				field: "authOrgNames",
				title: "数据权限",
				minWidth: 220
			},
			{
				field: "positionStatus",
				title: "职位状态",
				minWidth: 90,
				cell: info => {
					return {
						value: v => {
							return info.positionStatus == 1 ? "在职" : "离职";
						},
						text: {
							tooltip: false
						}
					};
				}
			},
			{
				field: "state",
				title: "人员状态",
				minWidth: 90,
				cell: info => {
					return {
						value: v => {
							return info.state == 1 ? "启用" : "禁用";
						},
						text: {}
					};
				}
			},
			{
				field: "operate",
				title: "操作",
				fixed: "right",
				minWidth: 100,
				cell: info => {
					return {
						btn: [
							{
								title: "编辑",
								color: "#3366FF",
								click: row => {
									this.onEdit(row);
								}
							},
							{
								title: info.state == 1 ? "禁用" : "启用",
								color: info.state == 1 ? "#F33C3C" : "#19BE6B",
								click: row => {
									this.onChangeStatus(row);
								}
							}
						]
					};
				}
			}
		];
	}
}
