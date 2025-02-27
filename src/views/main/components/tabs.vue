<script setup>
	import { ref, watch } from "vue";
	import router from "@/router";
	// import { codeStore } from '__store/code'
	import dt from "@/config/dt";
	const items = ref([]);
	const [current, currentName, temp, flag] = [ref(), ref(), ref(), ref(false)];
	const breadcrumbItems = ref([]);
	const remindArr = ref([]);
	watch(
		() => router.currentRoute.value,
		route => {
			let item = {
				meta: route.meta,
				name: route.name,
				params: route.params,
				query: route.query
			};
			current.value = item;
			currentName.value = route.name;
			let cOpRootList = route.meta.cOpRoot.split("/");
			breadcrumbItems.value = [...cOpRootList, route.meta.title];
			if (route.meta.name) {
				let has = null;
				items.value.some(itm => {
					if (itm.name == route.meta.name) has = itm;
					return itm.name == route.meta.name;
				});
				if (has) Object.assign(has, item);
				else items.value.push(item);
			}
		},
		{ immediate: true }
	);

	watch(
		() => current.value,
		res => {
			return router.push(res);
		}
	);

	watch(
		() => currentName.value,
		res => {
			if (remindArr.value.includes(res) || flag.value) {
				temp.value = res;
				current.value = items.value.filter(itm => itm.name == res)[0];
				flag.value = false;
			} else {
				isRemind(res);
			}
		}
	);

	// watch(
	//   () => codeStore().code,
	//   () => {
	//     let tmp = []
	//     items.value.forEach((itm) => {
	//       if (codeStore().canShowMenu(itm.meta.code)) tmp.push(itm)
	//     })
	//     items.value = tmp
	//   }
	// )

	function onClose(name) {
		// let index = items.value.findIndex(itm => itm.name == name);
		// items.value.splice(index, 1);
		const tabs = items.value;
		let activeName = currentName.value;
		if (activeName === name) {
			tabs.forEach((tab, index) => {
				if (tab.name === name) {
					const nextTab = tabs[index + 1] || tabs[index - 1];
					if (nextTab) {
						activeName = nextTab.name;
					}
				}
			});
		}
		currentName.value = activeName;
		items.value = tabs.filter(tab => tab.name !== name);
	}

	dt.notify.on("closeCurrent", () => onClose(currentName.value));

	const beforeRemove = name => {
		if (remindArr.value.includes(current.value.name)) {
			return new Promise((resolve, reject) => {
				dt.ui
					.messageBox({
						title: "提示",
						message: "关闭后未提交内容将会清空，是否确认关闭？",
						showCancelButton: true,
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(res => {
						flag.value = true;
						onClose(name);
						resolve();
					})
					.catch(close => {
						flag.value = false;
						reject();
					});
			});
		} else {
			onClose(name);
		}
	};

	function isRemind(res) {
		if (remindArr.value.includes(current.value.name)) {
			dt.ui
				.messageBox({
					title: "提示",
					message: "离开后未提交内容将会清空，是否确认离开？",
					showCancelButton: true,
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
				.then(res => {
					temp.value = res;
					current.value = items.value.filter(itm => itm.name == res)[0];
				})
				.catch(close => {
					currentName.value = temp.value;
				});
		} else {
			temp.value = res;
			current.value = items.value.filter(itm => itm.name == res)[0];
		}
	}
</script>

<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
			{{ item }}
		</el-breadcrumb-item>
	</el-breadcrumb>
	<div style="padding: 8px 5px; overflow-x: hidden; overflow-y: hidden; width: 100%; left: 40px">
		<div style="display: flex">
			<el-tabs type="card" :closable="items.length > 1" @tab-remove="beforeRemove" v-model="currentName">
				<el-tab-pane v-for="i in items" :key="i.name" :name="i.name" :label="i.meta.title"></el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<style scoped lang="scss">
	:deep(.el-tabs__header) {
		margin: 0;
	}
</style>
