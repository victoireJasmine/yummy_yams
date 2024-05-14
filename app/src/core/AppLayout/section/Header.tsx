import { useContext } from 'react';
import { SessionContext } from '../../../hooks/context/SessionContext';
import { NavLink  } from 'react-router-dom';
import { RouterName } from '../../../core/AppRoutes/RouterNames';

function Header() {
  const useSession = useContext(SessionContext);

  const logout = (): void => {
    useSession && useSession.logout();
  }

    return (
      <header>
        <p>Utilisateur: {useSession?.me?.name} - {useSession?.me?.email} </p>
        <NavLink to={RouterName.HOME.path}>Acceuil</NavLink> | 
        <NavLink to={RouterName.WINNERS.path}>Voir les gagnants</NavLink> |
        <button onClick={logout} >Déconnexion</button>
      </header>
    );
  }
  export default Header;