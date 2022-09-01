import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [emailValidationErrors, setEmailValidationErrors] = useState([]);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState([]);
  const [showEmailErrors, setShowEmailErrors] = useState(false);
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  useEffect(()=> {
    const errors = [];
    setErrors([]);
    if (!email.length) errors.push('email is required');

    function ValidateEmail(email) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mailformat)) {
        return true;
      }
      else {
        return false;
      }
    }

   if (!ValidateEmail(email)) errors.push('Email has invalid format');
   setEmailValidationErrors(errors);
  }, [email]);

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!password.length) errors.push('Password is required');
    setPasswordValidationErrors(errors);
  }, [password])

  const readyToSubmit = emailValidationErrors.length === 0 && passwordValidationErrors.length === 0;

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'))
  }

  // const updateEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const updatePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <h2>Log in to Yelp</h2>
      <div>
        <p>New to Yelp?</p>
        <NavLink to='/sign-up'>Sign up</NavLink>
      </div>
      <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div style={{color: 'red'}} key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          name='email'
          type='text'
          placeholder='Email, ex:example@email.com'
          value={email}
          onChange={e => { setEmail(e.target.value); setShowEmailErrors(true) }}
        />
         <>
          {showEmailErrors && emailValidationErrors.map((error, idx) => (
            <li key={idx} style={{color: 'red'}}>{error}</li>
          ))}
        </>
      </div>
      <div>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => {setPassword(e.target.value); setShowPasswordErrors(true)}}
        />
         <>
          {showPasswordErrors && passwordValidationErrors.map((error, idx) => (
            <li key={idx} style={{color: 'red'}}>{error}</li>
          ))}
        </>
        <button type='button' onClick={handleDemo}>Demo</button>
        <button disabled={!readyToSubmit} className={readyToSubmit ?"login-form-button": "not-ready-to-login"} type='submit'>Login</button>

      </div>
    </form>
    <div>
      <p>New to Yelp?</p>
      <NavLink to='/sign-up'>Sign up</NavLink>
    </div>

    </div>

  );
};

export default LoginForm;
