import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { getProfileThunk } from '../../store/session';
import './userProfile.css';


const GetUserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const businesses = useSelector(state => state.session.businesses);
    const reviews = useSelector(state => state.session.reviews);

    const [profileIsLoaded, setProfileIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getProfileThunk(user.id)).then(() => setProfileIsLoaded(true))

    }, [dispatch])



    if (!user) {
        return <Redirect to='/' />;
      }

    if (businesses) {
        const businessesList = Object.values(businesses);
    }

    if (reviews) {
        const reviewsList = Object.values(reviews);
    }



    return (
        profileIsLoaded &&
        <div className='profile-main-container'>
            <h1>{user.firstName} {user.lastName[0].toUpperCase()}.</h1>
            <div>
                <div>
                    <p></p>
                </div>
            </div>
        </div>


    )
}


export default GetUserProfile;
