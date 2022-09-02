import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getBusinessDetailThunk } from '../../store/business';
import { getAllReviewsThunk } from '../../store/review';
import { getAllImagesThunk } from '../../store/image';
import './getBusinessDetail.css'


const GetBusinessDetail = () => {
    const dispatch = useDispatch();
    const {businessId} = useParams();
    const business = useSelector(state => state.business[businessId]);
    const reviews = useSelector(state => state.review);
    const images = useSelector(state => state.image);

    const [businessIsLoaded, setBusinessIsLoaded] = useState(false);
    const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
    const [imagesIsLoaded, setImagesIsLoaded] = useState(false);

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



    return (businessIsLoaded && reviewsIsLoaded && imagesIsLoaded &&
    <div className='business-detail-main-container'>
        <div>
            <h2>{business.name}</h2>
            <p>{priceRange}</p>
            <div>
                <div>Rating:{averRating}</div>
                <div>{totalReviews} reviews</div>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <h3>Photos</h3>
                    <div className='business-detail-image-container'>
                        {imageList.map(url => {
                            return (
                                <img className='business-detail-image' key={url} alt='' src={url}/>
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
                                        <div>Rating: {review.rating}</div>
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
