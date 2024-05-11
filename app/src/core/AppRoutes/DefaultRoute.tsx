
import { RouterName } from './RouterNames';
import type { RouteObject } from 'react-router-dom';
import Home from '../../pages/default/home/Home'; 



export const defaultRouteConfig: RouteObject[] = [
  {
    path: RouterName.HOME.path,
    element: <Home />,
  },

];
