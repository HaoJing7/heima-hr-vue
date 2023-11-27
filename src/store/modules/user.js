import {getToken, removeToken, setToken} from "@/utils/auth";
import {login} from "@/api/user";
import async from "async";
/*
读取数据，走 state, getters
修改数据，走 mutations（修改state数据）, actions（异步操作）
*/

const state = {
  // 从缓存Cookie中读取
  token: getToken(),
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到Cookie缓存
    setToken(token)
  },
  removeToken() {
    state.token = null
    removeToken()
  }
}

const actions = {
  // context上下文  传入参数
  async login(context, data) {
    console.log(data)
    // TODO 调用登录接口
    const token = await login(data)
    // await 同步方式，后续代码不会在结果返回前执行
    context.commit('setToken', token)
  }
}


export default {
  // 开启命名空间，表示调用action的时候需要带上模块名称
  namespaced: true,
  state,
  mutations,
  actions
}

