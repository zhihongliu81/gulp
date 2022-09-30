import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { getProfileThunk } from '../../store/session';
import './userProfile.css';
import businessIcon from '../../images/businesses.jpg';
import reviewIcon from '../../images/reviews.png';


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


    let businessesList = [];
    if (businesses) {
        businessesList = Object.values(businesses);
    }
    let reviewsList = [];
    if (reviews) {
        reviewsList = Object.values(reviews);
    }



    return (
        profileIsLoaded &&
        <div className='profile-main-container'>
            <div className='profile-user-info'>
                <h1>{user.firstName} {user.lastName[0].toUpperCase()}.</h1>
                <div className='profile-user-business-review'>
                    <img className='profile-icon-image' alt='total reviews' src={reviewIcon} />
                    <p>{reviewsList.length} {reviewsList.length === 1 ? 'review' : 'reviews'}</p>
                    <img className='profile-icon-image' alt='total businesses' src={businessIcon} />
                    <p>{businessesList.length} {businessesList.length === 1 ? 'business' : 'businesses'}</p>
                </div>
            </div>

        </div>


    )
}


export default GetUserProfile;
