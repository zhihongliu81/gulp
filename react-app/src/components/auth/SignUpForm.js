import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
  const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
  const [emailValidationErrors, setEmailValidationErrors] = useState([]);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState([]);
  const [repeatPasswordValidationErrors, setRepeatPasswordValidationErrors] = useState([])
  const [showFirstNameErrors, setShowFirstNameErrors] = useState(false);
  const [showLastNameErrors, setShowLastNameErrors] = useState(false);
  const [showEmailErrors, setShowEmailErrors] = useState(false);
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);
  const [showRepeatPasswordErrors, setShowRepeatPasswordErrors] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!firstName.length) errors.push('First name is required');
    if (firstName.length > 50) errors.push("First name must be 50 characters or less");
    setFirstNameValidationErrors(errors);
  }, [firstName]);

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!lastName.length) errors.push('Last name is required');
    if (lastName.length > 50) errors.push("Last name must be 50 characters or less");
    setLastNameValidationErrors(errors);
  }, [lastName]);

  useEffect(()=> {
    const errors = [];
    setErrors([]);
    if (!email.length) errors.push('email is required');
    if (email.length > 255) errors.push("Email must be 255 characters or less")

    function ValidateEmail(email) {
      var mailformat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
      if (email.match(mailformat)) {
        return true;
      }
      else {
        return false;
      }
    }

   if (!ValidateEmail(email)) errors.push('Email has invalid format. ex:example@email.com')
   setEmailValidationErrors(errors);
  }, [email]);

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!password.length) errors.push('Password is required');
    setPasswordValidationErrors(errors);
  }, [password]);

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (repeatPassword !== password) {
      errors.push('Repeat password should match the password')
    }
    setRepeatPasswordValidationErrors(errors)
  }, [repeatPassword, password])

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };


  if (user) {
    return <Redirect to='/' />;
  }

  const readyToSubmit = firstNameValidationErrors.length === 0 &&
                      lastNameValidationErrors.length === 0 &&
                      emailValidationErrors.length === 0 &&
                      passwordValidationErrors.length === 0 &&
                      password === repeatPassword

  return (
    <div className='signup-form-main-container'>
      <div className='signup-form-left-container'>
        <h2>Sign Up for Yelp</h2>
        <p>Connect with great local businesses</p>
      <form onSubmit={onSignUp} className='signup-form-form-container'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className='error'>{error}</li>
          ))}
        </ul>
        <div className='signup-form-name-container'>
        <div>
          <input
            type='text'
            name='firstName'
            onChange={(e) => { setFirstName(e.target.value); setShowFirstNameErrors(true) }}
            value={firstName}
            placeholder='First Name'
            className='signup-form-input-first-name'
          ></input>
          <>
            {showFirstNameErrors && firstNameValidationErrors.map((error, idx) => (
              <li key={idx} className='error'>{error}</li>
            ))}
          </>
        </div>
        <div>
          <input
            type='text'
            name='lastName'
            onChange={(e) => { setLastName(e.target.value); setShowLastNameErrors(true) }}
            value={lastName}
            placeholder='Last Name'
            className='signup-form-input-last-name'
          ></input>
          <>
            {showLastNameErrors && lastNameValidationErrors.map((error, idx) => (
              <li key={idx} className='error'>{error}</li>
            ))}
          </>
        </div>
        </div>
        <div>
          <input
            type='text'
            name='email'
            onChange={(e) => { setEmail(e.target.value); setShowEmailErrors(true) }}
            value={email}
            placeholder='Email'
            className='signup-form-input-email'
          ></input>
          <>
            {showEmailErrors && emailValidationErrors.map((error, idx) => (
              <li key={idx} className='error'>{error}</li>
            ))}
          </>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={(e) => { setPassword(e.target.value); setShowPasswordErrors(true) }}
            value={password}
            placeholder='Password'
            className='signup-form-input-password'
          ></input>
          {showPasswordErrors && passwordValidationErrors.map((error, idx) => (
            <li key={idx} className='error'>{error}</li>
          ))}
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            onChange={(e) => {setRepeatPassword(e.target.value); setShowRepeatPasswordErrors(true)}}
            value={repeatPassword}
            required={true}
            placeholder='Repeat Password'
            className='signup-form-input-repeat-password'
          ></input>
          {showRepeatPasswordErrors && repeatPasswordValidationErrors.map((error, idx) => (
            <li key={idx} className='error'>{error}</li>
          ))}
        </div>
        <button disabled={!readyToSubmit} className={readyToSubmit ? "signup-form-button" : "not-ready-to-signup"} type='submit'>Sign Up</button>
      </form>
      <div className='signup-form-bottom-link'>
          <p>Already on Yelp?</p>
          <NavLink to='/login' className={'signup-form-bottom-navlink'}><p>Log in</p></NavLink>

        </div>

      </div>

      <div className='signup-form-right-container'>
        <img alt='signup_illustration' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' />
      </div>
    </div>

  );
};

export default SignUpForm;
