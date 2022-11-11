import { lazy } from 'react';
import { isAdmin } from '@/utils';
import { RouteType } from './routes.d';
const routesConfig: RouteType[] = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/basicLayout')),
    children: [
      {
        path: '',
        component: lazy(() => import('@/pages/home')),
      },
      {
        path: 'articles/:id',
        component: lazy(() => import('@/pages/articles')),
      },
      {
        path: 'user',
        component: lazy(() => import('@/pages/user')),
        required: (isLogin) => [!!isLogin, true],
      },
      {
        path: 'admin',
        component: lazy(() => import('@/layouts/adminLayout')),
        required: (isLogin, userInfo) => [!!isLogin, isAdmin(userInfo)],
        children: [
          {
            path: '',
            component: lazy(() => import('@/pages/admin/info')),
          },
          {
            path: 'questions',
            component: lazy(() => import('@/pages/admin/questions')),
          },
          {
            path: 'products',
            component: lazy(() => import('@/pages/admin/products')),
          },
          {
            path: 'statistics',
            component: lazy(() => import('@/pages/admin/statistics')),
          },
          {
            path: 'resume',
            component: lazy(() => import('@/pages/admin/resume')),
          },
          {
            path: 'info',
            component: lazy(() => import('@/pages/admin/info')),
          },
          {
            path: 'settings',
            component: lazy(() => import('@/pages/admin/settings')),
          },
        ],
      },
    ],
  },
];

export default routesConfig;
