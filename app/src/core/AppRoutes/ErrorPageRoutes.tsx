import React from 'react';
import { RouterName } from './RouterNames';
import type { RouteObject } from 'react-router-dom';
const Error404 = React.lazy(() => import('../../pages/error/404/Page404'));

export const errorPageRoutesConfig: RouteObject[] = [
  {
    path: RouterName.ERROR404.path,
    element: <Error404 />,
  },
];
