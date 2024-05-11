import { Formik } from 'formik';
import {String } from '../../../modules/Utils';
import { login , LoginParams } from '../../../network/endpoints/authentification';
import { useContext, useState } from 'react';
import { SessionContext } from '../../../hooks/context/SessionContext';
import { RouterName } from '../../../core/AppRoutes/RouterNames';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface ErrorLogin {
  email: string;
  password: string;

}


const Login = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const useSession = useContext(SessionContext);

  const onLogin = (values: LoginParams):void => {
    login(values)
      .then((response) => {
        setIsError(false);
        if (response.token) {
          setMessage(response.message);
          if(useSession){
            useSession.login(response.token)
          }
        } else {
          setMessage('Erreur de connexion');
          setIsError(true);
        }
      })
      .catch((error) => {
        setMessage(error.message?.message || error.message || 'Erreur de connexion');
        setIsError(true);
      });
  };
  return (
    <div>
      <h1>Se connecter</h1>
      {message && <p style={{color:isError?'red':'green'}}>{message}</p>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {} as ErrorLogin;
          if (String.isEmpty(values.email)) {
            errors.email = 'Required';
          } else if (
            !String.isValidEmail(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            onLogin(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <p><label>Email</label></p>
              <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              />
              <p style={{color:'red'}}>{errors.email && touched.email && errors.email}</p>
              
            </div>

            <div>
              <p><label>Password</label></p>
              <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <p style={{color:'red'}}>{errors.password && touched.password && errors.password}</p>

            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
          
        )}
      </Formik>
      <p>Vous n'avez pas de compte ? <NavLink to={RouterName.SIGNUP.path}>Inscrivez-vous</NavLink></p>
    </div>
  );

} 

export default Login;