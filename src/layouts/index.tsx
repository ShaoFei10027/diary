import React, { Suspense, useMemo } from 'react';
import { intl } from '@/locale';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routesConfig from './routes';
import { RouteType } from './routes.d';

export default function Layouts() {
  const { isLogin, userInfo } = useSelector((state: any) => state.root);
  const routes = useMemo(() => {
    const getRoutes: any = (arr: RouteType[]) => {
      return arr.map((route: RouteType) => {
        const [requireLoginStatus, requireRoleStatus] = route.required
          ? route.required(isLogin, userInfo)
          : [true, true];
        let Element = null;
        if (!requireLoginStatus) {
          Element = <div>无权限，请先登录</div>;
        } else if (!requireRoleStatus) {
          Element = <div>{intl.get('No_permission')}</div>;
        } else {
          const Component = route.component;
          Element = (
            <Suspense fallback="...">
              <Component />
            </Suspense>
          );
        }
        return {
          path: route.path,
          element: Element,
          children: route.children ? getRoutes(route.children) : undefined,
        };
      });
    };
    return getRoutes(routesConfig);
  }, [isLogin, userInfo]);

  return useRoutes(routes);
}
