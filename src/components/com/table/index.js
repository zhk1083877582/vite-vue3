import filter from './dt-filter.vue'
import table from './dt-table.vue'
import search from './dt-search.vue'
import treeIcon from './dt-tree-icon.vue'
import page from './dt-page.vue'
import header from './dt-header.vue'
import grid from './dt-grid.vue'

import { ElTableV2, ElEmpty, ElAutoResizer } from 'element-plus'
import 'element-plus/dist/index.css'

function init(app) {
  app.component('el-table-v2', ElTableV2)
  app.component('el-empty', ElEmpty)
  app.component('el-auto-resizer', ElAutoResizer)

  app.component('dt-filter', filter)
  app.component('dt-table', table)
  app.component('dt-search', search)
  app.component('dt-page', page)
  app.component('dt-tree-icon', treeIcon)
  app.component('dt-header', header)
  app.component('dt-grid', grid)
}

export default {
  init
}
