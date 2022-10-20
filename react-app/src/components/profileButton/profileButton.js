import React, {useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.png';
import aboutMeIcon from '../../images/aboutme-icon.png';
import logoutIcon from '../../images/logout-icon.jpg';
import './profileButton.css';
import LogoutButton from '../auth/LogoutButton';
import { logout } from '../../store/session';

const ProfileButton = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const dropdownMenu = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);



    const ToLogout = async (e) => {
        await dispatch(logout());
      };

    const closeDropdownMenu = (e) => {
        if (dropdownMenu.current && showDropdown && !dropdownMenu.current.contains(e.target)) {
            setShowDropdown(false)
        }
    }

    document.addEventListener('mousedown', closeDropdownMenu)



    return (
        <>
        <div className='profile-button-container' onClick={() => {setShowDropdown(true)}}>
        <img  className='profile-button-image' alt='profile icon' src={profileIcon} />
        <p>{user?.firstName[0].toUpperCase()}</p>
        </div>

        {showDropdown &&
                <div ref={dropdownMenu} className='profile-button-dropdown-container'>
                    <NavLink onClick={() => setShowDropdown(false)} className={'profile-dropdown-aboutme'} to='/user/reviews' exact={true} activeClassName='active'>
                        <img alt='about me icon' src={aboutMeIcon} />
                        <p>About Me</p>
                    </NavLink>
                    <div className='profile-dropdown-bottom'>
                        <div onClick={ToLogout} className='profile-dropdown-logout'>
                            <img alt='logout icon' src={logoutIcon} />
                            <LogoutButton />
                        </div>
                    </div>
                </div>}
        </>
    )
}


export default ProfileButton;
