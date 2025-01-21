import edit from "./dt-modal-edit.vue"
import info from "./dt-modal-info.vue"
import dtLoading from './dt-loading.vue'


function init(app) {
  app.component('dt-modal-info', info)
  app.component('dt-modal-edit', edit)
  app.component('dt-loading', dtLoading)
}

export default {
  init
}