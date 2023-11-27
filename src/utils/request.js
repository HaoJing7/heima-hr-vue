import axios from 'axios'
import store from "@/store";
import {Message} from "element-ui";
import router from "@/router";
// 创建一个axios实例
const service = axios.create({
  // 基础地址
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时时间 ms
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 统一注入token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器（解构数据、处理异常）
service.interceptors.response.use(
  (response) => {
    // 解构数据
    const {data, message, success} = response.data
    if (success) {
      return data
    } else {
      Message({type: 'error', message})
      return Promise.reject(new Error(message))
    }
  },
  async (error) => {
    // debugger用于调试
    // debugger
    if (error.response.status === 401) {
      Message({type: 'warning', message: 'token超时了'})
      await store.dispatch('user/logout') // 调用action退出登陆
      router.push('/login') // 跳转到登录页
      return Promise.reject(error)
    }
    // 使用ElementUI的Message
    Message({type: 'error', message: error.message})
    return Promise.reject(error)
  },
)

export default service;
