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
