
import { RouterName } from './RouterNames';
import type { RouteObject } from 'react-router-dom';
import Home from '../../pages/default/home/Home';
import Signup from '../../pages/default/signup/Signup';
import Login from '../../pages/default/login/Login';

export const defaultRouteConfig: RouteObject[] = [
  {
    path: RouterName.HOME.path,
    element: <Home />,
  },
  {
    path: RouterName.LOGIN.path,
    element: <Login />,
  },
  {
    path: RouterName.SIGNUP.path,
    element: <Signup />,
  }

];
