import Layout from "@/layout/index.vue";

export default {
  // 路由信息
  path: '/department',
  component: Layout,
  children: [{
    // 二级路由地址为空时，表示/department显示一级路由+二级路由
    // 空地址为默认二级路由，不需要在一级路由中添加redirect属性
    path: '',
    component: () => import('@/views/department'),
    name: 'department', // 可以用来跳转，也可以标记路由（用于权限控制）
    meta: {
      // 路由元信息 存储数据的
      icon: 'tree',
      title: '组织'
    }
  }]
}
