import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

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

   if (!ValidateEmail(email)) errors.push('Email has invalid format. ex:example@email.com');
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
    <div className='login-form-container'>
      <div className='login-form-left-container'>
        <h2>Log in to Yelp</h2>
        <div className='login-form-signup'>
          <p>New to Yelp?</p>
          <NavLink to='/sign-up' className={'login-form-signup-link'}><p>Sign up</p></NavLink>
        </div>
        <form onSubmit={onLogin} className='login-form-form-container'>
          <div>
            {errors.map((error, ind) => (
              <div className='error' key={ind}>{error}</div>
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
                <li key={idx} className='error'>{error}</li>
              ))}
            </>
          </div>
          <div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => { setPassword(e.target.value); setShowPasswordErrors(true) }}
            />
            <>
              {showPasswordErrors && passwordValidationErrors.map((error, idx) => (
                <li key={idx} className='error'>{error}</li>
              ))}
            </>
          </div>

          <button disabled={!readyToSubmit} className={readyToSubmit ? "login-form-button" : "not-ready-to-login"} type='submit'>Login</button>
          <button type='button' onClick={handleDemo} className='login-form-demo'>Demo</button>
        </form>
        <div className='login-form-bottom-link'>
          <p>New to Yelp?</p>
          <NavLink to='/sign-up' className={'login-form-bottom-navlink'}><p>Sign up</p></NavLink>

        </div>
      </div>
      <div className='login-form-right-container'>
        <img alt='login_illustration' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' />
      </div>

    </div>


  );
};

export default LoginForm;
