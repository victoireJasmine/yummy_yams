import Header from './section/Header';
import Footer from './section/Footer';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 10 }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
export default MainLayout;
