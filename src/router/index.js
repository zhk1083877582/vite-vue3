import '@/config'
import { createRouter, createWebHistory } from 'vue-router'
import views from '@/config/view'
import { userStore } from '@/store/user'
import { menuStore } from '@/store/menu'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/main/index.vue'),
      children: views.getContents()
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

router.setBeforeHandle = (func) => {
  router.beforeHandle = func
  if (func)
    window.onbeforeunload = function (e) {
      return ''
    }
  else window.onbeforeunload = null
}

let goLoginResolve = null
router.beforeEach((to, _, next) => {
  function goNext() {
    if (!to.name) {
      next('/')
    } else if (to.name == 'login') {
      next()
      if (goLoginResolve) {
        goLoginResolve()
        goLoginResolve = null
      }
    } else if (!userStore().isLogin) {
      next('/login')
    } else {
      next()
    }
  }
  if (router.beforeHandle) {
    router.beforeHandle().then(() => {
      goNext()
    })
  } else {
    goNext()
  }
})

router.goRoot = (name, query) => {
  console.log('goRoot', name, query, menuStore().first)
  // 跳转根菜单
  menuStore().choiceRoot()
  if (name) {
    router.push({ name, query })
  } else {
    router.replace({ name: menuStore().first?.name })
  }
}

router.goLogin = () => {
  goLoginResolve = null
  return new Promise((resolve, reject) => {
    goLoginResolve = resolve
    router.replace({ name: 'login' })
  })
}

export default router
