<template>
  <div style="display: flex;cursor: pointer" @click='onClick' :style="{marginLeft : row._tree_level * 15 + 'px'}">
    <Icon v-if="showIcon" style="margin: 4px 2px;" :class="loading ? 'dt-loading' : ''"
      :type="loading ? 'ios-loading' : row._tree_expand ? 'ios-arrow-down' : 'ios-arrow-forward'" :size='16' />
    <div v-else style="width: 6px;"/>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      row: Object,
      config: Object
    },
    data() {
      return {
        loading: false
      }
    },
    computed: {
      showIcon() {
        return this.config && this.config.showIcon != false && !this.row._tree_end
      }
    },
    methods: {
      onClick() {
        if (this.showIcon) {
          this.row._tree_expand = !this.row._tree_expand
          this.$emit('update', this.row)
        }
      }
    },
    mounted() {
      if(this.config){
        let cKey = this.config.children ?? 'children'
        let hKey = this.config.hasChild ?? 'hasChild'
        if (this.row[cKey]?.length == 0 || hKey) {
          this.row._tree_loading = (loading) => {
            this.loading = loading
          }
        } else {
          this.loading = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    padding: 14px 16px;
  }

  .elx-table .elx-body--column.col--ellipsis>.elx-cell {
    max-height: fit-content;
  }
</style>

