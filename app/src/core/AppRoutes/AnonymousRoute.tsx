
import { RouterName } from './RouterNames';
import type { RouteObject } from 'react-router-dom';
import Signup from '../../pages/default/signup/signup';
import Login from '../../pages/default/login/login';


export const anonymousRouteConfig: RouteObject[] = [
 
  {
    path: RouterName.LOGIN.path,
    element: <Login />,
  },
  {
    path: RouterName.SIGNUP.path,
    element: <Signup />,
  }

];
