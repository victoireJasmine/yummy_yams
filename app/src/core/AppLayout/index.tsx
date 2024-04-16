import { useRoutes } from 'react-router-dom';
import {
  defaultStructureRoute,
  principalStructureRoute,
  errorStructureRoute,
} from './../AppRoutes';
import MainLayout from './MainLayout';

const AppLayout = () => {
  const routes = useRoutes([
    ...defaultStructureRoute,
    ...errorStructureRoute,
    {
      element: <MainLayout />,
      children: [...principalStructureRoute],
    },
  ]);
  return routes;
};
export default AppLayout;
