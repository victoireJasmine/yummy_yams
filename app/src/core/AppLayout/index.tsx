import { useRoutes } from 'react-router-dom';
import {
  defaultStructureRoute,
  principalStructureRoute,
  anonymousStructureRoute,
  errorStructureRoute,
} from './../AppRoutes';
import MainLayout from './MainLayout';
import AnonymousLayout from './AnonymousLayout';

const AppLayout = () => {
  const routes = useRoutes([
    ...defaultStructureRoute,
    ...errorStructureRoute,
    {
      element: <MainLayout />,
      children: [...principalStructureRoute],
    },
    {
      element: <AnonymousLayout />,
      children: [...anonymousStructureRoute],
    },
  ]);
  return routes;
};
export default AppLayout;
