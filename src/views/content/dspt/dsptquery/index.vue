<template>
  <div>
    dsptquerydsptquerydsptquerydsptquery
    <el-button @click="handelClick">messageBox</el-button>
    <el-icon>
      <Search />
    </el-icon>
    <dt-grid ref="tableRef" :onFetch="onFetch" :checkbox="checkbox" page>
    </dt-grid>
    <dt-preview ref="previewRef" :images="preview.images" :showIndex="preview.showIndex" />
  </div>
</template>

<script setup>
import dt from "@/config/dt";
import { listOpt } from "./opt/columns.js";
import apiMgr from "./biz/index.js";

const [tableRef, previewRef] = [ref(), ref()];
let [preview, listData] = [ref({ images: [], showIndex: 0 }), ref()];
const checkbox = {
  isDisabled: (row) => {
    if (!row) return false;
    return row?.id != "84";
  },
  onOne: (row, flag) => {
    console.log("🚀 ~ row, flag:", row, flag);
  },
  onAll: (flag) => {
    console.log("🚀 ~ flag:", flag);
  },
  // radio: true,
};
const handelClick = () => {
  dt.ui
    .messageBox({
      title: "123",
      message: "sadasdas",
      showCancelButton: true,
      confirmButtonText: "确2定11",
      cancelButtonText: "取消222",
      type: "warning",
    })
    .then((res) => {
      console.log("🚀 ~ handelClick ~ res:", res);
    })
    .catch((close) => {
      console.log("🚀 ~ handelClick ~ close:", close);
    });
};

const fn = {
  toDetail: (data) => {
    let index = listData.value.findIndex((item) => item.id == data.id);
    onPreview(index);
  },
  delFun: (data) => {
    // removeFun(data);
  },
};
onMounted(() => {
  tableRef.value.init(new listOpt(fn));
  tableRef.value.fetch(true);
});
function onFetch(obj) {
  return apiMgr
    .getData()
    .then((res) => {
      console.log("🚀 ~ .then ~ res:", res);
      listData.value = res.list;
      return res;
    })
    .catch(() => {
      totalNum.value = 0;
    });
}
function onPreview(index) {
  preview.value.images = listData.value.map((item) => item.originalUrl);
  preview.value.showIndex = index;
  console.log("🚀 ~ onPreview ~ preview:", preview);
  nextTick(() => {
    previewRef.value.show(true);
  });
}
</script>

<style lang="scss" scoped></style>
