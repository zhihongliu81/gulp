import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllBusinessesThunk } from '../../store/business';
import './getAllBusinesses.css'


const GetAllBusinesses = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(state => state.business);
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const [imageId, setImageId] = useState(0);

    useEffect(() => {
        dispatch( getAllBusinessesThunk()).then(setIsLoaded(true));

    }, [dispatch])

    useEffect(() => {
        let counter = 0
        const id = setInterval(() => {counter++; setImageId(counter % 4)}, 4000)

        return () => clearInterval(id)

    }, [])


    let businessList=[];
    if (Object.keys(businesses).length > 0) {
        businessList = Object.values(businesses);
    } else {
        return null
    }

    const images = {
        0:"https://zhihong-capstone.s3.amazonaws.com/8e57fcc8cd554e77b2b4f123d78a73cf.jpg",
        1:"https://zhihong-capstone.s3.amazonaws.com/b76e55cffab94b86a451e9891e80d5b1.jpg",
        2:"https://zhihong-capstone.s3.amazonaws.com/2753747610e24ddd89bebe6052a2659d.jpg",
        3:"https://zhihong-capstone.s3.amazonaws.com/7a922a742dc040ebaf26387e0c4f70e8.jpg"

    }

    return ( isLoaded &&
        <div className='business-list-main-container'>
            <img className='business-list-splash-image' alt='splash' src={images[imageId]} />
            <h2>Your Next Review Awaits</h2>
            <div className='business-list-container'>
                {businessList.map(business => (
                    <div key={business.id} className='business-list-detail-container'>
                        { business.images.length > 0 && <img alt='business' className='business-list-image' src={business.images[0].url} />}
                        <div className='business-list-detail-right-container'>
                            <h3 className='business-list-name' onClick={() => {history.push(`/businesses/${business.id}`)}}>{business.name}</h3>
                            <p>Do you recommend this business?</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        )



}


export default GetAllBusinesses;
