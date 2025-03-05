import { codeStore } from '@/store/code'

let configs = import.meta.glob('/src/views/content/**/views.js', { eager: true })
let menuConfig = configs['/src/views/content/views.js'].default
delete configs['/src/views/content/views.js']
const vues = import.meta.glob('/src/views/content/**/index.vue')

let [views, menus] = [{}, {}]
Object.keys(menuConfig).forEach((key) => {
  menus[key] = { _items: menuConfig[key] }
})

console.log(views, menus)

Object.keys(configs).forEach((key) => {
  let base = key.replace('/src/views/content/', '').replace('/views.js', '')
  let config = configs[key].default
  if (config.menus) {
    Object.keys(menus).forEach((mk) => {
      if (config.menus[mk] != null) {
        menus[mk][base] = config.menus[mk]
      }
    })
  }
  config.views.forEach((item) => {
    let path = `${base}${item.path ? '/' : ''}${item.path ?? ''}`
    item.name = path
    if (item.menuPath) {
      item.menuName = `${base}/${item.menuPath}`
    }
    item.base = base
    views[path] = item
  })
})

function getContents() {
  let contents = []
  Object.keys(views).forEach((key) => {
    contents.push({
      path: `/${key}`,
      name: key,
      meta: views[key],
      component: () => vues[`/src/views/content/${key}/index.vue`]()
    })
  })
  return contents
}

function getMenuItem(item, path, type, root) {
  if (typeof item == 'string') {
    let view = views[`${path}${item ? '/' : ''}${item}`]
    if (codeStore().canShowMenu(view.code)) {
      return {
        // 子项
        type,
        root, // 上一级
        icon: view.icon,
        name: `${view.name}`,
        title: view.title
      }
    } else {
      return null
    }
  } else {
    if (item && codeStore().canShowMenu(item.code)) {
      root = root ? `${root}/${item.title}` : item.title
      return {
        // 根项
        name: root,
        title: item.title,
        icon: item.icon,
        children: item.children
          .map((itm) => {
            return getMenuItem(itm, path, type, root)
          })
          .filter((itm) => !!itm)
      }
    } else {
      return null
    }
  }
}

function getMenus(type) {
  let datas = []
  let menuConfigs = menus[type]
  menuConfigs._items.forEach((path) => {
    let ms = getMenuItem(menuConfigs[path], path, type)
    if (ms) datas.push(ms)
  })
  return datas
}

function getMenuTypes() {
  return Object.keys(menus)
}

export default {
  getContents,
  getMenus,
  getMenuTypes
}
