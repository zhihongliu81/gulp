import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.png';
import aboutMeIcon from '../../images/aboutme-icon.png';
import logoutIcon from '../../images/logout-icon.jpg';
import './profileButton.css';
import LogoutButton from '../auth/LogoutButton';
import { logout } from '../../store/session';

const ProfileButton = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        <img onClick={() => setShowDropdown(true)} className='profile-button-image' alt='profile icon' src={profileIcon} />
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
