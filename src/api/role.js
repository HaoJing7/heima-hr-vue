import request from "@/utils/request";

/**
 * 获取角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params: params
  })
}

/**
 * 新增角色
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
