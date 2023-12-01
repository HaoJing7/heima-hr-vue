import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    // :id? :id表示参数的名称 问号表示该id可有可无
    path: '/employee/detail/:id?',  // 员工的详情地址
    component: () => import('@/views/employee/Detail.vue'),
    hidden: true,  // 表示隐藏在左侧菜单
    meta: {
      title: '员工详情'  // 显示在导航的文本
    }
  }]
}

// 只想在左侧菜单显示一级菜单的话 让二级路由只有一个显示在左侧菜单
