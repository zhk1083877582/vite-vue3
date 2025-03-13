export default {
	menus: {
		root: {
			title: "测试页面",
			// code: '020000000000',
			icon: "claim-icon-icon-houtaiguanli",
			children: [
				{
					title: "test",
					// code: '020100000000',
					children: ["test1", "test2", "test3"]
				}
			]
		}
	},
	views: [
		{
			path: "test1",
			// code: '020103000000',
			title: "test1"
		},
		{
			path: "test2",
			// code: '020103000000',
			title: "test2"
		},
		{
			path: "test3",
			// code: '020103000000',
			title: "test3"
		}
	]
};
