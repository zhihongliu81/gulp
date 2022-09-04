import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getBusinessDetailThunk, deleteBusinessThunk } from '../../store/business';
import { getAllReviewsThunk } from '../../store/review';
import { getAllImagesThunk } from '../../store/image';
import './getBusinessDetail.css';
import { Rating } from 'react-simple-star-rating';
import ReviewForm from './reviewForm';
import { Modal } from '../../context/Modal';


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



    return (businessIsLoaded && reviewsIsLoaded && imagesIsLoaded &&
        <div className='business-detail-main-container'>
            <div>
                <h2>{business.name}</h2>
                <div>
                    <p>{priceRange}</p>
                    {user && user.id === business.userId &&
                        <div>
                            <NavLink to={`/businesses/${businessId}/edit`}>Edit</NavLink>
                            <button onClick={handleDeleteBusiness}>Delete</button>
                        </div>
                    }

                </div>

                <div>
                    <Rating initialValue={averRating} allowHalfIcon={true} readonly={true} />
                    <div>{totalReviews} reviews</div>
                    {user && <button onClick={() => {setShowReviewModal(true); setAction('create')}}>Write a Review</button>}
                </div>
                <>
                    {showReviewModal &&
                        <Modal onClose={() => setShowReviewModal(false)}>
                            <ReviewForm close={() => setShowReviewModal(false)} business={business} businessId={businessId} action={action} reviewId={reviewId} review={currentReview} />
                        </Modal>
                    }
                </>
            </div>
            <div>
                <div>
                    <div>
                        <h3>Photos</h3>
                        <div className='business-detail-image-container'>
                            {imageList.map(url => {
                                return (
                                    <img className='business-detail-image' key={url} alt='' src={url} />
                                )
                            })}
                        </div>
                        <div>
                            <h3>Reviews</h3>
                            <div>
                                {reviewList.map(review => {
                                    return (
                                        <div className='business-detail-review-container' key={review.id}>
                                            <div>{review.user.firstName}</div>
                                            { review.userId === user.id && <button onClick={() => {setShowReviewModal(true); setAction('edit'); setReviewId(review.id); setCurrentReview(review)}}>Edit Review</button>}
                                            <Rating initialValue={review.rating} allowHalfIcon={true} readonly={true} />
                                            <div>Reviewed: {review.createdAt}</div>
                                            <p>{review.content}</p>
                                        </div>
                                    )
                                })
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {business.website}
                    </div>
                    <div>
                        {business.phoneNumber}
                    </div>
                    <div>
                        {business.address} {business.city}, {business.state} {business.zipcode}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GetBusinessDetail;
