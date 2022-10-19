/* eslint-disable no-undef */


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getBusinessDetailThunk, deleteBusinessThunk } from '../../store/business';
import { getAllReviewsThunk, deleteReviewThunk } from '../../store/review';
import { getAllImagesThunk } from '../../store/image';
import './getBusinessDetail.css';
// import { Rating } from 'react-simple-star-rating';
import ReviewForm from './reviewForm';
import { Modal } from '../../context/Modal';
import ratingStarFilled from '../../images/rating-star-filled-1.png';
import ratingStarEmpty from '../../images/rating-star-empty-1.png';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";


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
    const [showDeleteBusinessModal, setShowDeleteBusinessModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
    const [action, setAction] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [currentReview, setCurrentReview] = useState({});
    const [center, setCenter] = useState({lat: 29.879444, lng: -97.938889});
    const [APIKey, setAPIKey] = useState('');



    //   Geocode
    Geocode.setApiKey(APIKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();


    useEffect(() => {
        dispatch(getBusinessDetailThunk(businessId)).then(() => setBusinessIsLoaded(true));
        dispatch(getAllReviewsThunk(businessId)).then(() => setReviewsIsLoaded(true));
        dispatch(getAllImagesThunk(businessId)).then(() => setImagesIsLoaded(true));
        fetch('/api/businesses/googleAPIKey').then( async (response) => {
            const data = await response.json()
            setAPIKey(data["googleApiKey"])
        })

    }, [dispatch, businessId])

    useEffect(() => {

        if (business) {
            const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zipcode}`;
            if (APIKey) {
                // Get latitude & longitude from address.
                Geocode.fromAddress(businessAddress).then(
                    (response) => {
                        const { lat, lng } = response.results[0].geometry.location;
                        setCenter({ lat, lng })
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }

        }
    }, [business, APIKey])

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
    let reviewList = [];
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
        dispatch(deleteBusinessThunk(businessId)).then(() => {setShowDeleteBusinessModal(false); history.push('/')})
    }

    const handleCreateReview = () => {
        let isReviewed = false
        reviewList.forEach(ele => {
            if (user && ele.userId === user.id) {
                isReviewed = true
                setAction('edit');
                setReviewId(ele.id);
                setCurrentReview(ele)
                        }
        })

        if (!isReviewed) {
            setAction('create')
        }
        setShowReviewModal(true)
    }

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReviewThunk(reviewId)).then(() => setShowDeleteReviewModal(false))
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





    const containerStyle = {
        width: '400px',
        height: '400px'
      };


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
                        <div className='business-detail-busi-review'>
                            {[1, 2, 3, 4, 5].map(ele => {
                                return (
                                    <div key={ele} >
                                        {averRating >= ele ? <img alt='' src={ratingStarFilled} /> : <img alt='' src={ratingStarEmpty} />}
                                    </div>
                                )
                            })}
                            <p>{totalReviews} reviews</p>
                        </div>

                        {user && user.id === business.userId &&
                            <div className='business-detail-busi-buttons'>
                                <button onClick={() => history.push(`/businesses/${businessId}/edit`)}>Edit</button>
                                <button onClick={() => setShowDeleteBusinessModal(true)}>Delete</button>
                                {showDeleteBusinessModal &&
                                    <Modal onClose={() => setShowDeleteBusinessModal(false) }>
                                        <div className='delete-modal-container'>
                                        <h2>Are you sure you would like to delete this business?</h2>
                                                    <div>
                                                        <button className='delete-modal-button' onClick={handleDeleteBusiness}>Delete</button>
                                                        <button className='delete-modal-button' onClick={() => setShowDeleteBusinessModal(false)}>Cancle</button>
                                                    </div>

                                        </div>
                                    </Modal>
                                }
                            </div>
                        }
                    </div>
                    {user && user.id !== business.userId && <button className='business-detail-review-button' onClick={handleCreateReview}>Write a Review</button>}
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
                                                <div key={url}>
                                                    <img className='business-detail-image' alt='' src={url} />
                                                </div>

                                            )
                                        })}
                                    </div>

                                </div>
                                <div className='group-detail-google-map'>
                                    {APIKey &&
                                        <LoadScript googleMapsApiKey={APIKey}>
                                            <GoogleMap
                                                mapContainerStyle={containerStyle}
                                                center={center}
                                                zoom={10}
                                                className='business-detail-map'
                                            >
                                                <>
                                                    <Marker position={center}></Marker>
                                                </>
                                            </GoogleMap>
                                        </LoadScript>
                                    }
                                </div>

                                <div className='business-detail-review-section'>
                                    <h3>Reviews</h3>
                                    <div>
                                        {reviewList.map(review => {
                                            return (
                                                <div className='business-detail-review-container' key={review.id}>
                                                    <div className='business-detail-review-name'>{review.user.firstName}</div>
                                                    {user && review.userId === user.id &&
                                                        <div className='business-detail-review-buttons'>
                                                            <button className='business-detail-review-edit-button' onClick={() => { setShowReviewModal(true); setAction('edit'); setReviewId(review.id); setCurrentReview(review) }}>Edit Review</button>
                                                            <button className='business-detail-review-delete-button' onClick={() => { setReviewId(review.id); setCurrentReview(review); setShowDeleteReviewModal(true) }}>Delete</button>
                                                        </div>
                                                    }
                                                    <div className='business-detail-review-rating-container'>
                                                        {[1, 2, 3, 4, 5].map(ele => {
                                                            return (
                                                                <div key={ele} >
                                                                    {review.rating >= ele ? <img className='business-detail-review-rating-image' alt='' src={ratingStarFilled} /> : <img className='business-detail-review-rating-image' alt='' src={ratingStarEmpty} />}
                                                                </div>

                                                            )
                                                        })}

                                                    </div>

                                                    <div className='business-detail-review-time'>Reviewed: {timeFormated(review.createdAt)}</div>
                                                    <p className='business-detail-review-content'>{review.content}</p>
                                                </div>
                                            )
                                        })
                                        }
                                        {showDeleteReviewModal &&
                                            <Modal onClose={() => setShowDeleteReviewModal(false)}>
                                                <div className='delete-modal-container'>
                                                    <h2>Are you sure you would like to delete this review?</h2>
                                                    <div>
                                                        <button className='delete-modal-button' onClick={() => { handleDeleteReview(reviewId) }}>Delete</button>
                                                        <button className='delete-modal-button' onClick={() => setShowDeleteReviewModal(false)}>Cancle</button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='business-detail-info-right-container'>
                    <div>
                        <h3>Website</h3>
                        <div className='business-detail-a-link'>
                            <a href={business.website} rel="noreferrer" target="_blank">{business.website}</a>
                        </div>
                    </div>
                    <div>
                        <h3>Contact</h3>
                        <p>{phoneNumberFormat(business.phoneNumber)}</p>

                    </div>
                    <div>
                        <h3>Address</h3>
                        <p>{business.address} </p>
                        <p>{business.city}, {business.state} {business.zipcode}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default GetBusinessDetail;
