import Header from './section/Header';
import Footer from './section/Footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../../hooks/context/SessionContext';

const MainLayout = () => {
  const useSession = useContext(SessionContext);

  useEffect(()=> {
    useSession && useSession.hasNotSessionUser();
  }, [useSession]);

  return (
    <>
      <Header />

      <hr />

      <div  style={{margin:'20px'}}>
        <Outlet />
      </div>
      <hr />

      <Footer />
    </>
  );
};
export default MainLayout;
