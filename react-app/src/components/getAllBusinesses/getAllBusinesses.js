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
        0:"https://zhihong-capstone.s3.amazonaws.com/8925dbe989814ce39d2fb723b4220fc1.jpg",
        1:"https://zhihong-capstone.s3.amazonaws.com/65466fd749da4bb28e3369592037043a.jpg",
        2:"https://zhihong-capstone.s3.amazonaws.com/2ebc0f2379474a8a8aa84f97496e41b9.jpg",
        3:"https://zhihong-capstone.s3.amazonaws.com/f7be9a61a3e3489b980c3c88bd2faaeb.jpg"

    }

    return ( isLoaded &&
        <div className='business-list-main-container'>
            <img className='business-list-splash-image' alt='splash' src={images[imageId]} />
            <h2>Your Next Review Awaits</h2>
            <div className='business-list-container'>
                {businessList.map(business => (
                    <div key={business.id} className='business-list-detail-container' onClick={() => {history.push(`/businesses/${business.id}`)}}>
                        { business.images.length > 0 && <img alt='business' className='business-list-image' src={business.images[0].url} />}
                        <div className='business-list-detail-right-container'>
                            <h3 className='business-list-name' >{business.name}</h3>
                            <p>Do you recommend this business?</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        )



}


export default GetAllBusinesses;
