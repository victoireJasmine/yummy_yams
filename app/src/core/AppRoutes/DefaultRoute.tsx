import React from 'react';
import { RouterName } from './RouterNames';
import type { RouteObject } from 'react-router-dom';
const Home = React.lazy(() => import('../../pages/default/home/Home'));
const Login = React.lazy(() => import('../../pages/default/login/Login'));
const Signup = React.lazy(() => import('../../pages/default/signup/Signup'));

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
