import { defineStore } from 'pinia'
import dt from '@/config/dt'
import { handleElementThemeColor, colourBlend } from '@/utils'

export const settingStore = defineStore('setting', {
  state: () => {
    return {
      menuType: 'TOP',
      systemThemeColor: '#5D87FF',
      SystemMainColor: [
        '#5D87FF',
        '#B48DF3',
        '#1D84FF',
        '#60C041',
        '#38C0FC',
        '#F9901F',
        '#FF80C8']
    }
  },
  getters: {

  },
  actions: {
    initSettingState() {
      let sys = dt.storage.get('setting_info')
      console.log("🚀 ~ setting.js:26 ~ initSettingState ~ sys:", sys)
      if (sys) {
        this.menuType = sys?.menuType
        this.systemThemeColor = sys?.systemThemeColor
        this.setElementThemeColor(sys.systemThemeColor)
      } else {
        let ElementPlusTheme = '#5D87FF'
        this.setElementThemeColor(ElementPlusTheme)
      }
    },
    saveSettingData() {
      let setting_info = { menuType: this.menuType, systemThemeColor: this.systemThemeColor }
      dt.storage.set('setting_info', setting_info)
    },
    setMenuType(data) {
      this.menuType = data
      this.saveSettingData()
    },
    setElementTheme(theme) {
      // theme = theme.split(',')[2].replace(')', '')
      this.systemThemeColor = theme
      this.setElementThemeColor(theme)
      this.saveSettingData()
    },
    setElementThemeColor(color) {
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
