import { Formik } from 'formik';
import {String } from '../../../modules/Utils';
import { createUser , CreateUserParams } from '../../../network/endpoints/authentification';
import { useState } from 'react';
import { RouterName } from '../../../core/AppRoutes/RouterNames';
import { NavLink } from 'react-router-dom';

interface ErrorRegister {
  name: string;
  email: string;
  password: string;


}


const Signup = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const onCreate = (values: CreateUserParams):Promise<void> => {
    return createUser(values)
      .then(() => {
        setIsError(false);
        setMessage('Compte créé avec succès');
      })
      .catch((error) => {
        setMessage(error.message?.message || error.message || 'Erreur de connexion');
        setIsError(true);
      });
  };
  return (
    <div>
      <h1>S'inscrire</h1>
      {message && <p style={{color:isError?'red':'green'}}>{message}</p>}
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={values => {
          const errors = {} as ErrorRegister;
          if (String.isEmpty(values.email)) {
            errors.email = 'Required';
          } else if (
            !String.isValidEmail(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (String.isEmpty(values.password)) {
            errors.password = 'Required';
          } else if (
            !String.isValidPassword(values.password)
          ) {
            errors.password = 'Invalid password';
          }

          if (String.isEmpty(values.name)) {
            errors.name = 'Required';
          } else if (
            !String.isValidName(values.name)
          ) {
            errors.name = 'Invalid name';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting , resetForm }) => {
          setTimeout(() => {
            onCreate(values)
            .then(() => {
              resetForm();
            });
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
              <p><label>Nom</label></p>
              <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              />
              <p style={{color:'red'}}>{errors.name && touched.name && errors.name}</p>
              
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
      <p>Vous avez déjà un compte ? <NavLink to={RouterName.LOGIN.path}>Connectez-vous</NavLink></p>
    </div>
  );

} 

export default Signup;