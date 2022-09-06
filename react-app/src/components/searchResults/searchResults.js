import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const SearchResults = () => {
    const businesses = useSelector(state => state.business);
    const history = useHistory();


    let businessList = [];
    let total_businesses = Object.keys(businesses).length;
    if (total_businesses > 0) {
        businessList = Object.values(businesses);
    } else {
        return <h2>Find 0 results.</h2>
    }

    return (
        <div>
            {businessList.map(business => (
                    <div key={business.id} className='business-list-detail-container'>
                        { business.images.length > 0 && <img className='business-list-image' src={business.images[0].url} />}
                        <div className='business-list-detail-right-container'>
                            <h3 className='business-list-name' onClick={() => {history.push(`/businesses/${business.id}`)}}>{business.name}</h3>
                            <p>{business.address}, {business.city}, {business.state}</p>

                        </div>
                    </div>
                ))}
        </div>
    )

}


export default SearchResults;
