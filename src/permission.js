import router from "@/router";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store";

/**
 * 前置守卫
 * to到哪里去 from从哪里来 next放行函数
 */
// 白名单
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 有token的情况下
    if (to.path === '/login') {
      // 如果访问的时候登录页（有token的情况下）
      next('/') // 中转到主页
      // next放行函数里面有地址的时候不会执行后置守卫
      nprogress.done() // 手动关闭进度条
    } else {
      // 判断是否获取过userInfo
      if (!store.getters.userId) {
        // 要等该动作执行完才执行下面的逻辑 要加await
        await store.dispatch('user/getUserInfo')
      }
      next() // 访问的不是登陆页，则直接放行
    }
  } else {
    // 没有token的情况
    if (whiteList.includes(to.path)) {
      next() // 如果在白名单当中则直接放行
    } else {
      next('/login') // 跳转到登录页
      nprogress.done()
    }
  }
})

/**
 * 后置守卫
 */
router.afterEach(() => {
  nprogress.done()
})
