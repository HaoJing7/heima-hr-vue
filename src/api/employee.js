import request from "@/utils/request";

/**
 * 获取员工列表
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params  // 地址参数，会拼接在地址后
  })
}

/**
 * 导出员工接口
 */
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型(之前使用的都是json形式)
    responseType: 'blob' // 使用blob来接受二进制文件流
  })
}

/**
 * 下载导入模板
 */
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

/**
 * 上传Excel文件
 */
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data  // form-data类型，因为要上传文件
  })
}

/**
 * 删除员工
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
