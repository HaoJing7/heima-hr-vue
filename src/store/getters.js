const getters = {
  // 取模块属性
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.userInfo.staffPhoto, // 头像
  name: state => state.user.userInfo.username, // 用户名
  userId: state => state.user.userInfo.userId // 用户id
}
// getters便捷访问
// 例如要取sidebar：getters.sidebar或state.app.sidebar
export default getters
