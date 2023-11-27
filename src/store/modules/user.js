import {getToken, removeToken, setToken} from "@/utils/auth";
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
  login(context, data) {
    console.log(data)
    // TODO 调用登录接口
    context.commit('setToken', '123456')
  }
}


export default {
  // 开启命名空间，表示调用action的时候需要带上模块名称
  namespaced: true,
  state,
  mutations,
  actions
}

