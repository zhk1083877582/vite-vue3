import { KeepAlive } from "vue";

export default {
	menus: {
		root: {
			title: "我的平台",
			code: "",
			icon: "claim-icon-liuchengshenpi",
			children: ["myWork", "myTask", "integrated"]
		}
	},
	views: [
		{
			path: "myWork",
			code: "",
			bread: "我的平台/我的工作",
			title: "我的工作",
			keep: true
		},
		{
			path: "myTask",
			code: "",
			bread: "我的平台/我的任务",
			title: "我的任务"
		},
		{
			path: "integrated",
			code: "",
			bread: "我的平台/综合查询",
			title: "综合查询"
		}
	]
};
