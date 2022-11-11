export interface RouteType {
  path: string;
  component: LazyExoticComponent;
  required?: (isLogin: boolean, userInfo?: any) => [boolean, boolean];
  children?: RouteType[];
}
