import { errorPageRoutesConfig } from './ErrorPageRoutes';
import { defaultRouteConfig } from './DefaultRoute';
import { Navigate } from 'react-router-dom';
import { RouterName } from './RouterNames';
import type { RouteObject } from 'react-router-dom';

const defaultStructureRoute: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={RouterName.HOME.path} />,
  },
  {
    path: '*',
    element: <Navigate to={RouterName.ERROR404.path} />,
  },
];
const principalStructureRoute: RouteObject[] = [...defaultRouteConfig];
const errorStructureRoute: RouteObject[] = [...errorPageRoutesConfig];
export { defaultStructureRoute, principalStructureRoute, errorStructureRoute };