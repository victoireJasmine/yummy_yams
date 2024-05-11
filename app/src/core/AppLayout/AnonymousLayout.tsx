import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../../hooks/context/SessionContext';

const AnonymousLayout = () => {
  const useSession = useContext(SessionContext);

  useEffect(()=> {
    useSession && useSession.hasSessionUser();
  }, [useSession]);

  return (
    <>
      <div >
        <Outlet />
      </div>
    </>
  );
};
export default AnonymousLayout;
