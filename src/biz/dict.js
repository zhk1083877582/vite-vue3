import server from "@/config/server/index.js";

import dt from "@/config/dt";

let api = {
	dict: () => {
		return server.api().post("").config(false);
	}
};
let key_dictInfo = "dict_info";
let dictInfo = dt.storage.get(key_dictInfo);

function deal(list) {
	list.forEach(i => {
		i.value = i.dictLabelCn;
		i.key = i.dictValue;
		i.expand = true;
		i.children && deal(i.children);
	});
}

function update() {
	console.log("🚀 ~ update ~ update:");

	return api
		.dict()
		.fetch()
		.then(res => {
			Object.keys(res).forEach(item => {
				deal(res[item]);
			});
			dt.storage.set(key_dictInfo, res);
			dictInfo = res;
			return res;
		});
}

function info() {
	return {
		...dictInfo,
		__value: (dictKey, key) => {
			let find = dictInfo[dictKey].find(item => item.key == String(key));
			return find ? find.value : "";
		},
		__key: (dictKey, value) => {
			let find = dictInfo[dictKey].find(item => item.value == String(value));
			return find ? find.key : "";
		}
	};
}

dt.dictInfo = info;

export default {
	update,
	info
};
