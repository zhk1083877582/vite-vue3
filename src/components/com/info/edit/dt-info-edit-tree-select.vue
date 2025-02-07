<template>
  <el-select v-model="selectVal" multiple :max-collapse-tags="maxTagCount" @visible-change="treeChange"
    class="tree-select" :placeholder="selectPlaceholder">
    <!-- <el-input
            v-model="searchContent"
            @on-search="searchTree"
            v-if="searchBtn"
            :placeholder="placeholder"
            class="search-content"
            :prefix-icon="Search"
            search
            enter-button
        /> -->
    <el-tree ref="treeList" show-checkbox :data="treeShowList"></el-tree>
    <el-option :value="item.id" v-for="item in treeOptions" :key="item.id" v-show="false">
      {{ item.title }}
    </el-option>
  </el-select>
</template>
<script>
import dt from "@/config/dt";
export default {
  props: {
    treeList: {
      type: Array,
      default: [],
    },
    searchBtn: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    selectPlaceholder: {
      type: String,
      default: "全部",
    },
    maxTagCount: {
      type: Number,
      default: 1,
    },
    saveParent: {
      type: Boolean,
      default: false, // 是否只保留父级
    },
    saveAll: {
      type: Boolean,
      default: false, // 是否保留选中所有
    },
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    searchFun: Function,
  },
  data() {
    return {
      selectVal: [],
      treeOptions: [],
      searchContent: "",
      resetTreeList: [],
      treeShowList: [],
      deepList: [],
    };
  },
  watch: {
    treeList: {
      handler(val, oldVal) {
        console.log("🚀 ~ handler ~ val, oldVal:", val, oldVal);
        this.deepList = dt.tool.deepClone(this.treeList);
        this.treeShowList = dt.tool.deepClone(this.deepList);
        this.treeOptions = dt.tool.flattenArr(this.treeShowList);
        this.$nextTick(() => {
          if (this.value) {
            this.deepList && this.forEachTree(this.deepList);
          }
          this.treeChange(false);
        });
      },
      // deep: true,
      immediate: true,
    },
  },
  created() { },
  mounted() { },
  methods: {
    searchTree() {
      this.searchFun(this.searchContent);
    },
    resetTreeVal() {
      this.selectVal = [];
      this.searchContent = "";
      // this.treeShowList = dt.tool.deepClone(this.resetTreeList)
    },
    forEachTree(mess) {
      mess.map((item) => {
        if (this.value && this.value.includes(item.id)) {
          this.$set(item, "checked", true);
        }
        item.children && this.forEachTree(item.children);
      });
    },
    // tree处理
    async treeChange(res) {
      if (res) {
        if (this.value) {
          this.deepList && this.forEachTree(this.deepList);
        }
      } else {
        this.selectVal = [];
        let checkNode = this.$refs.treeList.getCheckedNodes();

        let showNode = await this.resolveCheckData(checkNode);
        showNode.forEach((item) => {
          this.selectVal.push(item.id);
        });

        this.$emit("input", this.selectVal, showNode); //更新父级组件的value
        this.$emit("onChange");
      }
    },
    // 处理选择数据 分选中当前最高级父级 或展示子集
    resolveCheckData(checkNode) {
      let filterArr = [];
      if (this.saveAll) {
        filterArr = checkNode;
      } else if (!this.saveParent && !this.saveAll) {
        filterArr = checkNode.filter((item) => {
          return !(item.children && item.children.length);
        });
      } else {
        let flatArr = dt.tool.flattenArr(checkNode);
        // 获取id相同的值
        let repeatID = this.repeatFun(flatArr);
        filterArr = flatArr.filter((ele) => {
          return repeatID.indexOf(ele.id) <= -1;
        });
      }
      console.log(filterArr, "****");
      return filterArr;
    },
    repeatFun(arr) {
      let filterArr = [];
      let arrID = arr.map((item) => {
        return item.id;
      });
      arrID.forEach((item) => {
        let num = arrID.filter((n) => n === item).length;
        if (num > 1 && !filterArr.find((m) => m === item)) {
          filterArr.push(item);
        }
      });
      return filterArr;
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-select.ivu-select-multiple {
  :deep(.ivu-tag) {
    max-width: 60%;
    padding: 0 5px;
  }

  :deep(.ivu-tag) i {
    display: none;
  }

  :deep(.ivu-select-dropdown) {
    width: 100%;
    min-width: auto !important;
  }

  .search-content.ivu-input-wrapper {
    margin-left: 15px;
    width: 85%;
  }

  :deep(.ivu-tree-empty) {
    margin-left: 15px;
    line-height: 40px;
  }
}
</style>
