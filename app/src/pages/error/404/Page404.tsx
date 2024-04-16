import React from 'react';
import './Page404.scss';
import { Link } from 'react-router-dom';
import { RouterName } from '../../../core/AppRoutes/RouterNames';

function Error404() {
  return (
    <div>
      <h1>page not found</h1>
      <Link to={RouterName.HOME.path}> Retour à l'acceuil </Link>
    </div>
  );
}

export default Error404;
