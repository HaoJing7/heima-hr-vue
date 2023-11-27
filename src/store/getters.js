const getters = {
  // 取模块属性
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userInfo.userId
}
// getters便捷访问
// 例如要取sidebar：getters.sidebar或state.app.sidebar
export default getters
