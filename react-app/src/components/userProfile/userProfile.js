import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams, Redirect } from 'react-router-dom';
import { getProfileThunk } from '../../store/session';
import './userProfile.css';
import businessIcon from '../../images/businesses.jpg';
import reviewIcon from '../../images/reviews.png';
import ratingStarFilled from '../../images/rating-star-filled-1.png';
import ratingStarEmpty from '../../images/rating-star-empty-1.png';
import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';


const GetUserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const businesses = useSelector(state => state.business);
    const reviews = useSelector(state => state.review);

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

    const businessRating = (business) => {
        let averRating = 0;
        let totalReviews = Object.keys(business.reviews).length;
        if (totalReviews > 0) {
            let total = 0;
            Object.values(business.reviews).forEach(ele => {
                total += ele.rating
            })
            averRating = (total / totalReviews).toFixed(1)
        }

        return [averRating, totalReviews]
    }

    const handleDeleteBusiness = () => {

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
            <div className='profile-review-business-container'>
                <div className='profile-reviews'>
                    <h2>You have {reviewsList.length} {reviewsList.length === 1 ? 'review' : 'reviews'}</h2>
                    {reviewsList.map(review => (
                        <div key={review.id}>
                            <div className='profile-business-container'>
                            {review.business.images.length > 0 && <img id='profile-review-business-image' src={review.business.images[0].url} />}
                            <div className='profile-business-info'>
                                <h2 onClick={() => { history.push(`/businesses/${review.business.id}`) }}>{review.business.name}</h2>
                                <div className='profile-business-address'>
                                    <p>{review.business.address}</p>
                                    <p>{review.business.city}, {review.business.state} {review.business.zipcode}</p>
                                </div>
                            </div>
                            </div>
                            <div className='profile-review-review-info'>

                            </div>


                        </div>
                    ))}

                </div>
                <div className='profile-businesses'>
                    <h2>You have {businessesList.length} {businessesList.length === 1 ? 'business' : 'businesses'}</h2>
                    {businessesList.map(business => (
                        <div key={business.id} className='profile-business-container'>
                            {business.images.length > 0 && <img className='' src={business.images[0].url} />}
                            <div className='profile-business-info'>
                                <h2 onClick={() => { history.push(`/businesses/${business.id}`) }}>{business.name}</h2>
                                <div className='profile-business-rating-images'>
                                    {[1, 2, 3, 4, 5].map(ele => {
                                        return (
                                            <div key={ele} >
                                                {businessRating(business)[0] >= ele ? <img alt='' src={ratingStarFilled} /> : <img alt='' src={ratingStarEmpty} />}
                                            </div>
                                        )
                                    })}
                                    <p>{businessRating(business)[0]}</p>
                                </div>
                                <p>{businessRating(business)[1]} {businessRating(business)[1] === 1 ? 'review' : 'reviews'}</p>
                                <div className='profile-business-address'>
                                    <p>{business.address}</p>
                                    <p>{business.city}, {business.state} {business.zipcode}</p>
                                </div>
                                {user && user.id === business.userId &&
                                    <div className='profile-business-edit-delete'>
                                        <NavLink to={`/businesses/${business.id}/edit`}><img alt='' src={editIcon}/></NavLink>
                                        <img alt='' src={deleteIcon}/>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default GetUserProfile;
