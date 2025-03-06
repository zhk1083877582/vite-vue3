import { defineStore } from 'pinia'
import dt from '@/config/dt'
import router from '@/router'
import { codeStore } from '@/store/code'

const key_user = 'user_info'
const key_history = 'user_history'
const key_role = 'user_role'

export const userStore = defineStore('user', {
  state: () => {
    return {
      role: dt.session.get(key_role),
      info: dt.session.get(key_user),
      history: dt.storage.get(key_history) || { accounts: [] }
    }
  },
  getters: {
    isLogin: (state) => {
      return state.info
    }
  },
  actions: {

    choiceRole(item) {
      item.key = dt.dictInfo().roleType.find((i) => i.key == item.roleId)?.dictLabelEn
      this.role = item
      dt.session.set(key_role, item)
    },
    login(item) {
      this.info = item
      dt.session.set(key_user, item)
      // if (this.history.accounts.indexOf(item.login.searchKey) < 0) {
      //   this.history.accounts.push(item.login.searchKey)
      // }
      // dt.storage.set(key_history, this.history)
      codeStore()
        .updateCode(true)
        .then(() => {
          router.goRoot()
        })
    },
    logout() {
      this.info = null
      this.role = null
      dt.session.remove(key_user)
      dt.session.remove(key_role)
      // codeStore().clear()
      router.goLogin()
    },
    canShowMenu(code) {
      // return codeStore().canShowMenu(code)
    },
    canShowButton(code) {
      // return codeStore().canShowButton(code)
    },
    setElementThemeColor(color) {
      console.log("🚀 ~ user.js:59 ~ setElementThemeColor ~ color:", color)
      const mixColor = '#ffffff'
      const elStyle = document.documentElement.style

      elStyle.setProperty('--el-color-primary', color)
      handleElementThemeColor(color, useSettingStore().isDark)

      // 生成更淡一点的颜色
      for (let i = 1; i < 16; i++) {
        const itemColor = colourBlend(color, mixColor, i / 16)
        elStyle.setProperty(`--el-color-primary-custom-${i}`, itemColor)
      }
    }
  }

})

setTimeout(() => {
  // codeStore().bingUpdateFunc(codeMgr.update)
  if (userStore().isLogin) {
    codeStore().updateCode(true)
  }
}, 1000)
