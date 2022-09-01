
import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);



  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    setCurrentPath(window.location.pathname)

  }, [user, window.location.pathname])

  // return (
  //   <div>
  //     <div>
  //       <NavLink to='/' exact={true} activeClassName='active'>gulp</NavLink>
  //     </div>
  //     {user ? (<div>
  //           <LogoutButton />
  //         </div>) : (
  //           <div>
  //             <div>
  //         <NavLink to='/login' exact={true} activeClassName='active'>
  //           Login
  //         </NavLink>
  //         </div>
  //         <div>
  //           <NavLink to='/sign-up' exact={true} activeClassName='active'>
  //           Sign Up
  //           </NavLink>
  //         </div>

  //           </div>
  //         ) }
  //   </div>

  // )
  console.log(currentPath)
  if ( currentPath === '/login' || currentPath === '/sign-up' ) {
    return (
      <div>
        <NavLink to='/' exact={true} activeClassName='active' onClick={() => setCurrentPath(window.location.pathname)}>gulp</NavLink>
      </div>
    )
  } else {
    if (user) {
      return (
        <div>
          <div>
            <NavLink to='/' exact={true} activeClassName='active' onClick={() => setCurrentPath(window.location.pathname)}>gulp</NavLink>
          </div>
          <div>
            <LogoutButton />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <NavLink to='/' exact={true} activeClassName='active' onClick={() => setCurrentPath(window.location.pathname)}>gulp</NavLink>
          </div>
          <div>
          <NavLink to='/login' exact={true} activeClassName='active' onClick={() => setCurrentPath(window.location.pathname)}>
            Login
          </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active' onClick={() => setCurrentPath(window.location.pathname)}>
            Sign Up
            </NavLink>
          </div>
        </div>
      )

    }
  }



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
