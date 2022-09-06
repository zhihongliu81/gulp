
import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import SearchBar from './searchBar/searchBar';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const location = useLocation();
  const path = location.pathname;

  let sessionLink;

  if ( path === '/login' || path === '/sign-up' ) {
    sessionLink = (
    <div className='navbar-main-container'>
      <NavLink to='/' exact={true} activeClassName='active' >gulp</NavLink>
    </div>
    )

  } else {

      sessionLink = (
        <div className='navbar-main-container'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active' >gulp</NavLink>
          </div>
          <div>
            <SearchBar />
          </div>
          <div>
            <NavLink to='/businesses/new' exact={true} activeClassName='active'>Add a Business</NavLink>
          </div>
          <div>
            {user ? <LogoutButton /> :
            <div className='navbar-login-signup-container'>
                <div>
                  <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                  </NavLink>
                </div>
            </div>
            }

          </div>
        </div>
      )

  }

  return (
    <div className='navbar-sessionLink-container'>
      {sessionLink}
    </div>

  )


}

export default NavBar;
