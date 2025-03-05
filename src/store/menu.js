import { defineStore } from 'pinia'
import dt from '@/config/dt'
import views from '@/config/view.js'

const key_menu_type = 'key_menu_type'

export const menuStore = defineStore('menu', {
  state: () => {
    return {
      types: {},
      type: dt.session.get(key_menu_type) ?? 'root',
      dic: {}
    }
  },
  getters: {
    items: (state) => {
      return state.types[state.type]?.items
    },
    first: (state) => {
      console.log(state, state.type)
      return state.types[state.type]?.first
    },
    isRoot: (state) => {
      return state.type == 'root'
    }
  },
  actions: {
    update() {
      let dic = {}
      this.types = {}
      let assignDic = (itms) => {
        let check = (itm) => {
          if (itm.children) itm.children.forEach((i) => check(i))
          else {
            if (!this.types[itm.type].first) {
              this.types[itm.type].first = itm
            }
            dic[itm.name] = itm
          }
        }
        itms.forEach((itm) => check(itm))
      }
      views.getMenuTypes().forEach((key) => {
        let itms = views.getMenus(key)
        this.types[key] = { items: itms }
        assignDic(itms)
      })
      this.dic = dic
    },
    choiceType(type) {
      if (this.type != type) {
        this.type = type
        dt.session.set(key_menu_type, type)
      }
    },
    choiceRoot() {
      this.choiceType('root')
    }
  }
})
