import { defineStore } from 'pinia'
import dt from '@/config/dt'
import { handleElementThemeColor, colourBlend } from '@/utils'

export const settingStore = defineStore('setting', {
  state: () => {
    return {

    }
  },
  getters: {

  },
  actions: {


    setElementThemeColor(color) {
      console.log("🚀 ~ user.js:59 ~ setElementThemeColor ~ color:", color)
      const mixColor = '#ffffff'
      const elStyle = document.documentElement.style

      elStyle.setProperty('--el-color-primary', color)
      handleElementThemeColor(color)

      // 生成更淡一点的颜色
      for (let i = 1; i < 16; i++) {
        const itemColor = colourBlend(color, mixColor, i / 16)
        elStyle.setProperty(`--el-color-primary-custom-${i}`, itemColor)
      }
    }
  }

})
