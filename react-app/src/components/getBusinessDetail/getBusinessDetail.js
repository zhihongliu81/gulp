import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getBusinessDetailThunk } from '../../store/business';
import { getAllReviewsThunk } from '../../store/review';
import { getAllImagesThunk } from '../../store/image';


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
    }, [dispatch])



    return (businessIsLoaded && reviewsIsLoaded && imagesIsLoaded &&
    <div>
       <h2>Business Detail</h2>
    </div>
    )
}


export default GetBusinessDetail;
