import request from "@/utils/request";

/**
 * 获取组织架构的数据
 */
export function getDepartment () {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

/**
 * 获取部门负责人
 */
export function getMangerList() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

/**
 * 新增组织
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
