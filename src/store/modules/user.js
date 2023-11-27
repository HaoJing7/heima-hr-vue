import {getToken, removeToken, setToken} from "@/utils/auth";
import {login, getUserInfo} from "@/api/user";
/*
读取数据，走 state, getters
修改数据，走 mutations（修改state数据）, actions（异步操作）
*/

const state = {
  // 从缓存Cookie中读取
  token: getToken(),
  userInfo: {}, // 存储用户基本资料状态
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
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // context上下文  传入参数
  // 使用await的时候，方法上要加上async
  async login(context, data) {
    console.log(data)
    // TODO 调用登录接口
    const token = await login(data)
    // await 同步方式，后续代码不会在结果返回前执行
    context.commit('setToken', token)
  },
  // 获取用户的基本资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
  }
}


export default {
  // 开启命名空间，表示调用action的时候需要带上模块名称
  namespaced: true,
  state,
  mutations,
  actions
}

