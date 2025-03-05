import { defineStore } from 'pinia'
import { menuStore } from './menu'
import dt from '@/config/dt'

const key_code = 'user_code'

let timeout = null

export const codeStore = defineStore('code', {
  state: () => {
    return {
      code: dt.session.get(key_code),
      updateFunc: () => Promise.resolve({})
    }
  },
  getters: {
    isLogin: (state) => {
      return state.info && state.code
    }
  },
  actions: {
    bingUpdateFunc(func) {
      this.updateFunc = func || (() => Promise.resolve({}))
    },
    updateCode(isFirst) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.updateCode()
      }, 300000)
      return this.updateFunc().then((res) => {
        res = { entryMenuCodeList: res.entryMenuCodeList, buttonMenuCodeList: res.buttonMenuCodeList }
        if (JSON.stringify(res) != JSON.stringify(this.code)) {
          if (this.code && !isFirst) {
            dt.ui.Message.warning('您的权限发生变化！')
          }
          this.code = res
          dt.session.set(key_code, res)
          menuStore().update()
        } else if (isFirst) {
          menuStore().update()
        }
        return res
      })
    },
    clear() {
      clearTimeout(timeout)
      this.code = null
      dt.session.remove(key_code)
    },
    canShowMenu(code) {
      if (dt.env.env == 'dev' || code == '') return true
      return !code || this.code?.entryMenuCodeList.indexOf(code) >= 0
    },
    canShowButton(code) {
      if (dt.env.env == 'dev') return true
      return !code || this.code?.buttonMenuCodeList.indexOf(code) >= 0
    }
  }
})
