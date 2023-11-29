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

/**
 * 获取部门详情
 */
export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}

/**
 * 更新部门
 */
export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除部门
 */
export function delDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}


