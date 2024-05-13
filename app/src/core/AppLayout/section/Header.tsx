import { useContext } from 'react';
import { SessionContext } from '../../../hooks/context/SessionContext';

function Header() {
  const useSession = useContext(SessionContext);

  const logout = (): void => {
    useSession && useSession.logout();
  }

    return (
      <header>
        <p>Utilisateur: {useSession?.me?.name} - {useSession?.me?.email} </p>
        <button onClick={logout} >Déconnexion</button>
      </header>
    );
  }
  export default Header;