<script setup>
import { ref, watch } from "vue";
import router from "@/router";
// import { codeStore } from '__store/code'
import dt from "@/config/dt";
const items = ref([]);
const [current, currentName, temp, flag] = [ref(), ref(), ref(), ref(false)];

const remindArr = ref([
    "contract/contractStart/startSign",
    "commission/rootManage/settlement/submit",
    "commission/proManage/settlement/submit",
    "commission/proManage/channelCost/submit",
]);
watch(
    () => router.currentRoute.value,
    (route) => {
        let item = {
            meta: route.meta,
            name: route.name,
            params: route.params,
            query: route.query,
        };
        current.value = item;
        currentName.value = route.name;
        if (route.meta.name) {
            let has = null;
            items.value.some((itm) => {
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
    (res) => {
        return router.push(res);
    }
);

watch(
    () => currentName.value,
    (res) => {
        if (remindArr.value.includes(res) || flag.value) {
            temp.value = res;
            current.value = items.value.filter((itm) => itm.name == res)[0];
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
    let index = items.value.findIndex((itm) => itm.name == name);
    items.value.splice(index, 1);
}

dt.notify.on("closeCurrent", () => onClose(currentName.value));

const beforeRemove = () => {
    if (remindArr.value.includes(current.value.name)) {
        return new Promise((resolve, reject) => {
            dt.ui.Modal.confirm({
                title: `提示`,
                content: `关闭后未提交内容将会清空，是否确认关闭？`,
                onOk: () => {
                    flag.value = true;
                    resolve();
                },
                onCancel: () => {
                    flag.value = false;
                    reject();
                },
            });
        });
    }
};

function isRemind(res) {
    console.log("🚀 ~ isRemind ~ res:", res);
    if (remindArr.value.includes(current.value.name)) {
        dt.ui.Modal.confirm({
            title: `提示`,
            content: `离开后未提交内容将会清空，是否确认离开？`,
            onOk: () => {
                temp.value = res;
                current.value = items.value.filter((itm) => itm.name == res)[0];
            },
            onCancel: () => {
                currentName.value = temp.value;
            },
        });
    } else {
        temp.value = res;
        current.value = items.value.filter((itm) => itm.name == res)[0];
    }
}
</script>

<template>
    <div
        style="
            padding: 8px 5px;
            overflow-x: hidden;
            overflow-y: hidden;
            width: 100%;
            left: 40px;
        "
    >
        <div style="display: flex">
            <el-tabs
                type="card"
                closable
                @on-tab-remove="onClose"
                v-model="currentName"
                :before-remove="beforeRemove"
            >
                <el-tab-pane
                    v-for="i in items"
                    :key="i.name"
                    :name="i.name"
                    :label="i.meta.title"
                ></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped lang="sass"></style>
