import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useLocation, Redirect } from 'react-router-dom';
import { getProfileThunk } from '../../store/session';
import './userProfile.css';
import businessIcon from '../../images/businesses.jpg';
import reviewIcon from '../../images/reviews.png';
import ratingStarFilled from '../../images/rating-star-filled-1.png';
import ratingStarEmpty from '../../images/rating-star-empty-1.png';
import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';
import { Modal } from '../../context/Modal';
import { deleteBusinessThunk } from '../../store/business';
import ReviewForm from '../getBusinessDetail/reviewForm';
import { deleteReviewThunk } from '../../store/review';



const GetUserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const businesses = useSelector(state => state.business);
    const reviews = useSelector(state => state.review);
    const location = useLocation();
    const path = location.pathname;

    const [profileIsLoaded, setProfileIsLoaded] = useState(false);
    const [showDeleteBusinessModal, setShowDeleteBusinessModal] = useState(-1);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
    const [currentBusiness, setCurrentBusiness] = useState();
    const [currentBusinessId, setCurrentBusinessId] = useState(-1);
    const [currentReview, setCurrentReview] = useState();
    const [reviewId, setReviewId] = useState(-1);


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

    const handleDeleteBusiness = (businessId, e) => {
        e.preventDefault();
        dispatch(deleteBusinessThunk(businessId)).then(() => setShowDeleteBusinessModal(false))
    }

    const handleDeleteReview = (reviewId, e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(reviewId)).then(() => {setShowDeleteReviewModal(false)})
    }

    const timeFormated = (time) => {
        const createdDate = new Date(time)
        const date = createdDate.getDate();
        const month = createdDate.getMonth() + 1;
        const year = createdDate.getFullYear();

        return `${month}/${date}/${year}`
    }

    const profileReviews = profileIsLoaded &&
        (
            <div className='profile-reviews'>
                <h2>You have {reviewsList.length} {reviewsList.length === 1 ? 'review' : 'reviews'}</h2>
                {reviewsList.map(review => (
                    <div key={review.id} className='profile-review-container'>
                        <div className='profile-review-business-container'>
                            {review.business?.images.length > 0 && <img alt='' className='profile-review-business-image' src={review.business.images[0].url} />}
                            <div className='profile-business-info'>
                                <h2 onClick={() => { history.push(`/businesses/${review.business.id}`) }}>{review.business.name}</h2>
                                <div className='profile-business-address'>
                                    <p>{review.business.address}</p>
                                    <p>{review.business.city}, {review.business.state} {review.business.zipcode}</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-review-review-info'>
                            <div className='profile-review-rating'>
                                {[1, 2, 3, 4, 5].map(ele => {
                                    return (
                                        <div key={ele} >
                                            {review.rating >= ele ? <img alt='' src={ratingStarFilled} /> : <img alt='' src={ratingStarEmpty} />}
                                        </div>
                                    )
                                })}
                                <p>{timeFormated(review.createdAt)}</p>
                            </div>
                            <p>{review.content}</p>
                            <div className='profile-review-edit-delete'>
                                <img alt='' src={editIcon}
                                    onClick={() => {setShowReviewModal(true);
                                                    setCurrentBusiness(review.business);
                                                    setCurrentBusinessId(review.business.id);
                                                    setCurrentReview(review);
                                                    setReviewId(review.id)
                                                    }} />
                                <img alt='' src={deleteIcon} onClick={() => {setShowDeleteReviewModal(true);setReviewId(review.id)}} />
                            </div>

                        </div>
                    </div>
                ))}
                <>
                        {showReviewModal &&
                            <Modal onClose={() => setShowReviewModal(false)}>
                                <ReviewForm close={() => setShowReviewModal(false)} business={currentBusiness} businessId={currentBusinessId} action='edit' reviewId={reviewId} review={currentReview} />
                            </Modal>
                        }
                </>
                <>
                            {showDeleteReviewModal &&
                                <Modal onClose={() => setShowDeleteReviewModal(false)} >
                                    <div className='delete-modal-container'>
                                        <h2>Are you sure you would like to delete this review?</h2>
                                        <div >
                                            <button className='delete-modal-button' onClick={(e) => handleDeleteReview(reviewId, e)}>Delete</button>
                                            <button className='delete-modal-button' onClick={() => () => setShowDeleteReviewModal(false)}>Cancle</button>
                                        </div>
                                    </div>

                                </Modal>
                            }
                        </>
            </div>
        )


    const profileBusinesses = profileIsLoaded &&
        (
            <div className='profile-businesses'>
                <h2>You have {businessesList.length} {businessesList.length === 1 ? 'business' : 'businesses'}</h2>
                {businessesList.map(business => (
                    <div key={business.id} className='profile-business-container'>
                        {business.images.length > 0 && <img alt='' className='' src={business.images[0].url} />}
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
                                    <NavLink to={`/businesses/${business.id}/edit`}><img alt='' src={editIcon} /></NavLink>
                                    <img alt='' src={deleteIcon} onClick={() => setShowDeleteBusinessModal(business.id)} />
                                </div>
                            }
                        </div>
                        <>
                            {showDeleteBusinessModal === business.id &&
                                <Modal onClose={() => setShowDeleteBusinessModal(false)} >
                                    <div className='delete-modal-container'>
                                        <h2>Are you sure you would like to delete: {business.name}?</h2>
                                        <div >
                                            <button className='delete-modal-button' onClick={(e) => handleDeleteBusiness(business.id, e)}>Delete</button>
                                            <button className='delete-modal-button' onClick={() => setShowDeleteBusinessModal(false)}>Cancle</button>
                                        </div>
                                    </div>

                                </Modal>
                            }
                        </>
                    </div>
                ))}
            </div>
        )


    return (
        profileIsLoaded &&
        <div className='profile-main-container'>
            <div className='profile-user-info'>
                <h1>{user.firstName} {user.lastName[0].toUpperCase()}.</h1>
                <div className='profile-user-business-review'>
                    <img className='profile-icon-image' alt='total reviews' src={reviewIcon} />
                    <p onClick={() => history.push('/user/reviews')}>{reviewsList.length} {reviewsList.length === 1 ? 'review' : 'reviews'}</p>
                    <img className='profile-icon-image' alt='total businesses' src={businessIcon} />
                    <p onClick={() => history.push('/user/businesses')}>{businessesList.length} {businessesList.length === 1 ? 'business' : 'businesses'}</p>
                </div>
            </div>
            <div className='profile-review-business-container'>
                {path === '/user/reviews' ? profileReviews : profileBusinesses}
            </div>
        </div>
    )
}


export default GetUserProfile;
