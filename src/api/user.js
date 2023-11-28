import request from "@/utils/request";

/**
 * 登陆接口
 * @param data
 * @returns promise对象
 */
export function login(data) {
  // request一执行就会得到一个promise对象
  // 要返回promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户资料
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    // 默认是get类型，可以不写
    method: 'get',
  })
}

/**
 * 修改密码
 */
export function updatePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
