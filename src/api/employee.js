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
