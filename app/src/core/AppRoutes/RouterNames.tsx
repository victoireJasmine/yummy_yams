interface PathLink {
    name: string;
    path: string;
    desc?: string;
  }
  export const RouterName = {
    HOME: createPathLink('HomePage', '/home'),
    GAME: createPathLink('GamePage', '/game'),
    WINNERS: createPathLink('WinnersPage','/winners' ),
    LOGIN: createPathLink('LoginPage', '/login'),
    SIGNUP: createPathLink('SignupPage', '/signup'),
    ERROR404: createPathLink('ErrorPage', '/404'),
  };
  function createPathLink(name: string, link: string, desc?: string): PathLink {
    return {
      name,
      desc,
      path: link,
    };
  }
  