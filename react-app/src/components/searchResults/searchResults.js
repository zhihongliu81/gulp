import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';


const SearchResults = () => {
    const businesses = useSelector(state => state.business);
    const history = useHistory();


    let businessList = [];
    let total_businesses = Object.keys(businesses).length;
    if (total_businesses > 0) {
        businessList = Object.values(businesses);
    } else {
        return <h2>0 Results Found.</h2>
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

        return averRating
    }

    const phoneNumberFormat = (phoneNumber) => {
        return `(${phoneNumber.slice(0,3)})${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`
    }


    return (
        <div>
            <h2>{total_businesses} {total_businesses === 1 ? 'Result': 'Results'} Found.</h2>
            {businessList.map(business => (
                    <div key={business.id} className='business-list-detail-container'>
                        { business.images.length > 0 && <img className='business-list-image' src={business.images[0].url} />}
                        <div className='business-list-detail-right-container'>
                            <h3 className='business-list-name' onClick={() => {history.push(`/businesses/${business.id}`)}}>{business.name}</h3>
                            <Rating initialValue={ businessRating(business) } allowHalfIcon={true} readonly={true}/>
                            <p>{phoneNumberFormat(business.phoneNumber)}</p>
                            <p>{business.address}, {business.city}, {business.state}</p>

                        </div>
                    </div>
                ))}
        </div>
    )

}


export default SearchResults;
