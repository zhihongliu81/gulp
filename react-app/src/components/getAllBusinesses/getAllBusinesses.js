import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllBusinessesThunk } from '../../store/business';
import './getAllBusinesses.css'


const GetAllBusinesses = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(state => state.business);
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory()

    useEffect(() => {
        dispatch( getAllBusinessesThunk()).then(setIsLoaded(true));

    }, [dispatch])


    let businessList;
    if (Object.keys(businesses).length > 0) {
        businessList = Object.values(businesses);
    } else {
        return null
    }

    return ( isLoaded &&
        <div className='business-list-main-container'>
            <h2>Your Next Review Awaits</h2>
            <div className='business-list-container'>
                {businessList.map(business => (
                    <div key={business.id} className='business-list-detail-container'>
                        { business.images.length > 0 && <img className='business-list-image' src={business.images[0].url} />}
                        <div className='business-list-detail-right-container'>
                            <h3 className='business-list-name' onClick={() => {history.push(`/businesses/${business.id}`)}}>{business.name}</h3>
                            <p>Do you recommend this business?</p>
                            <div>⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        )



}


export default GetAllBusinesses;
