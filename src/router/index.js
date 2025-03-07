import '@/config'
import { createRouter, createWebHistory } from 'vue-router'
import views from '@/config/view'
import { userStore } from '@/store/user'
import { menuStore } from '@/store/menu'
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入
NProgress.configure({
  // 动画方式
  easing: "ease",
  // 递增进度条的速度
  speed: 500,
  // 是否显示加载ico
  showSpinner: false,
  // 自动递增间隔
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.3,
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
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
  NProgress.start();
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
  // 如果访问根路径，重定向到第一个子路由
  if (to.path === "/") {
    const firstRoute = menuStore().first
    if (firstRoute) {
      next({ name: firstRoute.name });
      return;
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
router.afterEach(() => {
  NProgress.done();
});

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
