// 导入模块
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon  引入icons目录下的index.js文件
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // mock数据
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// 全局注册ElementUI的组件，在任意位置都可以使用ElementUI的组件
//Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
 Vue.use(ElementUI)

Vue.config.productionTip = false

// 实例化Vue
new Vue({
  el: '#app',  // 指定了容器，给Vue实例找一个要管理的视图 #app(在App.vue中的html元素)
  router,  // 把router和Vuex挂载到当前的实例上
  store,
  render: h => h(App)  // 渲染App.vue组件
})
