
import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);



  const [currentPath, setCurrentPath] = useState(window.location.pathname)


  let sessionLink;

  if ( currentPath === '/login' || currentPath === '/sign-up' ) {
    sessionLink = (
    <div>
      <NavLink to='/' exact={true} activeClassName='active' onClick={() => setCurrentPath('/')}>gulp</NavLink>
    </div>
    )

  } else {

      sessionLink = (
        <div className='navbar-main-container'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active' onClick={() => setCurrentPath('/')}>gulp</NavLink>
          </div>
          <div>Search bar</div>
          <div>
            <NavLink to='/businesses/new' exact={true} activeClassName='active'>Add a Business</NavLink>
          </div>
          <div>
            {user ? <LogoutButton /> :
            <div className='navbar-login-signup-container'>
                <div>
                  <NavLink to='/login' exact={true} activeClassName='active' onClick={() => setCurrentPath('/login')}>
                    Login
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/sign-up' exact={true} activeClassName='active' onClick={() => setCurrentPath('/sign-up')}>
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
    <div>
      {sessionLink}
    </div>
  )


  // return (
  //   <nav>
  //     <ul>
  //       <li>
  //         <NavLink to='/' exact={true} activeClassName='active'>
  //           Home
  //         </NavLink>
  //       </li>
  //       {!user && <div>
  //         <li>
  //         <NavLink to='/login' exact={true} activeClassName='active'>
  //           Login
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/sign-up' exact={true} activeClassName='active'>
  //           Sign Up
  //         </NavLink>
  //       </li>

  //       </div>
  //       }

  //       {user && <li>
  //         <LogoutButton />
  //       </li>}

  //     </ul>
  //   </nav>
  // );
}

export default NavBar;
