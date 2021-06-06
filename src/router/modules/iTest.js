/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const itesteRouter = {
  path: '/itest',
  component: Layout,
  redirect: '/testcase/project',
  name: 'ITest',
  meta: {
    title: '测试管理',
    icon: 'table'
  },
  children: [
    {
      path: 'project',
      component: () => import('@/views/testcase/project'),
      name: 'Project',
      meta: { title: '项目' }
    },
    {
      path: 'module',
      component: () => import('@/views/testcase/module'),
      name: 'module',
      meta: { title: '模块' }
    },
    {
      path: 'case',
      component: () => import('@/views/testcase/case'),
      name: 'case',
      meta: { title: '用例' }
    }
  ]
}
export default itesteRouter
