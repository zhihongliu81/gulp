/* eslint-disable no-undef */


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getBusinessDetailThunk, deleteBusinessThunk } from '../../store/business';
import { getAllReviewsThunk, deleteReviewThunk } from '../../store/review';
import { getAllImagesThunk } from '../../store/image';
import './getBusinessDetail.css';
import { Rating } from 'react-simple-star-rating';
import ReviewForm from './reviewForm';
import { Modal } from '../../context/Modal';
import ratingStarFilled from '../../images/rating-star-filled-1.png';
import ratingStarEmpty from '../../images/rating-star-empty-1.png';


const GetBusinessDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {businessId} = useParams();
    const user = useSelector(state => state.session.user)
    const business = useSelector(state => state.business[businessId]);
    const reviews = useSelector(state => state.review);
    const images = useSelector(state => state.image);

    const [businessIsLoaded, setBusinessIsLoaded] = useState(false);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const [imagesIsLoaded, setImagesIsLoaded] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [action, setAction] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [currentReview, setCurrentReview] = useState({});

    useEffect(() => {
        dispatch(getBusinessDetailThunk(businessId)).then(() => setBusinessIsLoaded(true));
        dispatch(getAllReviewsThunk(businessId)).then(() => setReviewsIsLoaded(true));
        dispatch(getAllImagesThunk(businessId)).then(() => setImagesIsLoaded(true));
    }, [dispatch, businessId])

    let priceRange;
    if (business) {
        const minPrice = Number(business.minPrice);
        if (minPrice >= 80) {
            priceRange = '$$$$'
        }
        else if (minPrice >= 40) {
            priceRange = '$$$'
        }
        else if (minPrice >= 15) {
            priceRange = '$$'
        }
        else {
            priceRange= '$'
        }
    } else {
        return null
    }

    let averRating = 0;
    let totalReviews = Object.keys(reviews).length;
    let reviewList = []
    if (totalReviews > 0) {
        let total = 0;
        Object.values(reviews).forEach(ele => {
            total += ele.rating
            reviewList.push(ele)
        })
        averRating = (total / totalReviews).toFixed(1)
    }

    let imageList = [];
    if (Object.keys(images).length > 0) {
        Object.values(images).forEach(ele => {
            imageList.push(ele.url)
        })
    }

    const handleDeleteBusiness = async (e) => {
        e.preventDefault();
        dispatch(deleteBusinessThunk(businessId)).then(() => history.push('/'))
    }

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId))
    }

    const timeFormated = (time) => {
        const createdDate = new Date(time)
        const date = createdDate.getDate();
        const month = createdDate.getMonth() + 1;
        const year = createdDate.getFullYear();

        return `${month}/${date}/${year}`
    }

    const phoneNumberFormat = (phoneNumber) => {
        return `(${phoneNumber.slice(0,3)})${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`
    }



    return (businessIsLoaded && reviewsIsLoaded && imagesIsLoaded &&
        <div className='business-detail-main-container'>
            <img className='business-detail-splash-image' alt='business detail splash image' src={imageList[0]} />
            <div className='business-detail-info-container'>
                <div>
                    <div className='business-detail-busi-info-container'>
                        <div className='business-detail-busi-name'>
                            <h2>{business.name}</h2>
                            <p>{priceRange}</p>
                        </div >
                        {/* <Rating initialValue={averRating} allowHalfIcon={true} readonly={true} /> */}
                        <div className='business-detail-busi-review'>
                            {[1, 2, 3, 4, 5].map(ele => {
                                return (
                                    <div key={ele} >
                                        {averRating >= ele ? <img alt='' src={ratingStarFilled} /> : <img alt='' src={ratingStarEmpty} />}
                                    </div>
                                )
                            })}
                            <p>{averRating}</p>
                            <p>{totalReviews} reviews</p>
                        </div>

                            {user && user.id === business.userId &&
                                <div className='business-detail-busi-buttons'>
                                    <NavLink to={`/businesses/${businessId}/edit`}>Edit</NavLink>
                                    <button onClick={handleDeleteBusiness}>Delete</button>
                                </div>
                            }


                    </div>
                    {user && <button className='business-detail-review-button' onClick={() => { setShowReviewModal(true); setAction('create') }}>Write a Review</button>}
                    <>
                        {showReviewModal &&
                            <Modal onClose={() => setShowReviewModal(false)}>
                                <ReviewForm close={() => setShowReviewModal(false)} business={business} businessId={businessId} action={action} reviewId={reviewId} review={currentReview} />
                            </Modal>
                        }
                    </>
                    <div>
                        <div>
                            <div >
                                <div className='business-detail-image-section'>
                                <h3>Photos</h3>
                                <div className='business-detail-image-container'>
                                    {imageList.map(url => {
                                        return (
                                            <div>
                                                <img className='business-detail-image' key={url} alt='' src={url} />
                                            </div>

                                        )
                                    })}
                                </div>

                                </div>

                                <div>
                                    <h3>Reviews</h3>
                                    <div>
                                        {reviewList.map(review => {
                                            return (
                                                <div className='business-detail-review-container' key={review.id}>
                                                    <div>{review.user.firstName}</div>
                                                    {user && review.userId === user.id &&
                                                        <div>
                                                            <button onClick={() => { setShowReviewModal(true); setAction('edit'); setReviewId(review.id); setCurrentReview(review) }}>Edit Review</button>
                                                            <button onClick={() => { handleDeleteReview(review.id) }}>Delete</button>
                                                        </div>

                                                    }
                                                    {/* <Rating initialValue={review.rating} allowHalfIcon={true} readonly={true} /> */}
                                                    <div className='review-form-rating-container'>
                                                        {[1, 2, 3, 4, 5].map(ele => {
                                                            return (
                                                                <div key={ele} >
                                                                    {review.rating >= ele ? <img className='review-form-rating-image' alt='' src={ratingStarFilled} /> : <img className='review-form-rating-image' alt='' src={ratingStarEmpty} />}
                                                                </div>

                                                            )
                                                        })}

                                                    </div>

                                                    <div>Reviewed: {timeFormated(review.createdAt)}</div>
                                                    <p>{review.content}</p>
                                                </div>
                                            )
                                        })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='business-detail-info-right-container'>
                    <div>
                        <h3>website</h3>
                        <p>{business.website}</p>
                    </div>
                    <div>
                        <h3>Contact</h3>
                        <p>{phoneNumberFormat(business.phoneNumber)}</p>

                    </div>
                    <div>
                        <h3>Address</h3>
                        <p>{business.address} {business.city}, {business.state} {business.zipcode}</p>

                    </div>
                </div>

            </div>

        </div>
    )
}


export default GetBusinessDetail;
