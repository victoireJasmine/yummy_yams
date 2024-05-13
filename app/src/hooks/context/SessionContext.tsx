import { createContext, useEffect, useState } from 'react';
import { SessionCookie } from '../../modules/session';
import type { PropsWithChildren } from 'react';
import { RouterName } from '../../core/AppRoutes/RouterNames';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../network/endpoints/authentification';
import { User } from '../../normalizr/user/user';


type SessionState =  string | null;

type SessionContextProps = {
  session: SessionState;
  login: (session: string)=> void;
  logout: ()=> void;
  hasSessionUser: ()=> void;
  hasNotSessionUser: ()=> void;
  me: User | null;
}

export const SessionContext = createContext<SessionContextProps | null>(null);

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<SessionState>(SessionCookie.get());
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedState = SessionCookie.get();
    if (storedState) {
      setSession(storedState);
    }
    getCurrentUser()
  }, []);
  useEffect(() => {
    session && SessionCookie.set(session);
  }, [session]);


  const logout = (): void => {
    SessionCookie.destroy();
    setSession( SessionCookie.get());

    navigate(RouterName.LOGIN.path);
    
  };

  const login = (token: string): void => {
    SessionCookie.set(token);
    setSession(SessionCookie.get());

    getCurrentUser().finally(() => navigate('/'));
  };

  const getCurrentUser=():Promise<void>=>{
    return getMe().then((response) => {
      setUser(response);
    })
  }
  const hasSessionUser=():void=>{
    if(!session){
        return
    }
    navigate('/');
  }

  const hasNotSessionUser=():void=>{
    if(session){
        return
    }
    logout();
  }

  return (
    <SessionContext.Provider
      value={{ session,me:user, login, logout, hasNotSessionUser, hasSessionUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};
export default SessionProvider;