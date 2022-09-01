import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([]);
  const [lastNameValidationErrors, setLastNameValidationErrors] = useState([]);
  const [emailValidationErrors, setEmailValidationErrors] = useState([]);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState([]);
  const [showFirstNameErrors, setShowFirstNameErrors] = useState(false);
  const [showLastNameErrors, setShowLastNameErrors] = useState(false);
  const [showEmailErrors, setShowEmailErrors] = useState(false);
  const [showPasswordErrors, setShowPasswordErrors] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!firstName.length) errors.push('First name is required');
    setFirstNameValidationErrors(errors);
  }, [firstName]);

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!lastName.length) errors.push('Last name is required');
    setLastNameValidationErrors(errors);
  }, [lastName]);

  useEffect(() => {
    const errors = [];
    setErrors([]);
    if (!password.length) errors.push('Password is required');
    setPasswordValidationErrors(errors);
  }, [password]);

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

   if (!ValidateEmail(email)) errors.push('Email has invalid format')
   setEmailValidationErrors(errors);
  }, [email]);

  useEffect(() => {
    setErrors([]);

  }, [confirmPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  // const updateUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  // const updateEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const updatePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // const updateRepeatPassword = (e) => {
  //   setRepeatPassword(e.target.value);
  // };

  if (user) {
    return <Redirect to='/' />;
  }

  const readyToSubmit = firstNameValidationErrors.length === 0 &&
                      lastNameValidationErrors.length === 0 &&
                      emailValidationErrors.length === 0 &&
                      passwordValidationErrors.length === 0 &&
                      password === confirmPassword

  return (
    <form onSubmit={onSignUp}>
      <ul>
          {errors.map((error, idx) => (
            <li key={idx}  className='error'>{error}</li>
          ))}
        </ul>
      <div>
        <input
          type='text'
          name='firstName'
          onChange={(e) => {setFirstName(e.target.value); setShowFirstNameErrors(true)}}
          value={firstName}
          placeholder='First Name'
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
          onChange={(e) => {setLastName(e.target.value); setShowLastNameErrors(true)}}
          value={lastName}
          placeholder='Last Name'
        ></input>
        <>
          {showLastNameErrors && lastNameValidationErrors.map((error, idx) => (
            <li key={idx} className='error'>{error}</li>
          ))}
        </>
      </div>
      <div>
        <input
          type='text'
          name='email'
          onChange={(e) => {setEmail(e.target.value); setShowEmailErrors(true)}}
          value={email}
          placeholder='Email'
        ></input>
        <>
          {showEmailErrors && emailValidationErrors.map((error, idx) => (
            <li key={idx} className='error'>{error}</li>
          )) }
        </>
      </div>
      <div>
        <input
          type='password'
          name='password'
          onChange={(e) => {setPassword(e.target.value); setShowPasswordErrors(true)}}
          value={password}
          placeholder='Password'
        ></input>
        {showPasswordErrors && passwordValidationErrors.map((error, idx) => (
            <li key={idx} className='error'>{error}</li>
          ))}
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required={true}
          placeholder='Repeat Password'
        ></input>
      </div>
      <button disabled={!readyToSubmit} className={readyToSubmit ? "signup-form-button" : "not-ready-to-signup"} type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
