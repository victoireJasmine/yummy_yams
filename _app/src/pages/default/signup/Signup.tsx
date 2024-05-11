import { Formik } from 'formik';
import {String } from '../../../modules/Utils';
import { login , LoginParams } from '../../../network/endpoints/authentification';
import { useState } from 'react';


interface ErrorLogin {
  name: string;
  email: string;
  password: string;

}


const Signup = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const onLogin = (values: LoginParams):void => {
    login(values)
      .then((response) => {
        setIsError(false);
        if (response.token) {
          //todo: mettre cette logique dans une fonction contexte de création de session
          localStorage.setItem('TOKER_USER_YUMMY', response.token);
          setMessage(response.message);
        } else {
          setMessage('Erreur de connexion');
          setIsError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message?.message || 'Erreur de connexion');
        setIsError(true);
      });
  };
  return (
    <div>
      <h1>Se connecter</h1>
      <p>{import.meta.env.VITE_YUMMY_API}</p>
      {message && <p style={{color:isError?'red':'green'}}>{message}</p>}
      <Formik
        initialValues={{ name: '',email: '', password: '' }}
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
              <p><label>Name</label></p>
              <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              />
              <p style={{color:'red'}}>{errors.email && touched.email && errors.email}</p>
              
            </div>
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
    </div>
  );

} 

export default Signup;