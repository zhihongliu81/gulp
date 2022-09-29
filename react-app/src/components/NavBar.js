
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import SearchBar from './searchBar/searchBar';
import ProfileButton from './profileButton/profileButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const location = useLocation();
  const path = location.pathname;

  let sessionLink;

  if ( path === '/login' || path === '/sign-up' ) {
    sessionLink = (
    <div className='navbar-main-container-1'>
      <NavLink className={'navbar-homelink-1'} to='/' exact={true} activeClassName='active' >gulp</NavLink>
    </div>
    )

  } else {

      sessionLink = (
        <div className='navbar-main-container'>
          <div>
            <NavLink className={'navbar-homelink'} to='/' exact={true} activeClassName='active' >gulp</NavLink>
          </div>
          <div>
            <SearchBar />
          </div>
          <div>

            <div>
              {user ?
                <div className='navbar-add-business-logout-container'>

                    <NavLink className={'navbar-add-business'} to='/businesses/new' exact={true} activeClassName='active'>Add a Business</NavLink>


                  {/* < LogoutButton /> */}
                  <ProfileButton />


                </div>
                :
                <div className='navbar-login-signup-container'>
                  <div>
                    <NavLink className='navbar-login' to='/login' exact={true} activeClassName='active'>
                      Login
                    </NavLink>
                  </div>
                  <div>
                    <NavLink className={'navbar-signup'} to='/sign-up' exact={true} activeClassName='active'>
                      Sign Up
                    </NavLink>
                  </div>
                </div>
              }
            </div>
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
