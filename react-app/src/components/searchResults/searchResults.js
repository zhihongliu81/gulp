import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { Rating } from 'react-simple-star-rating';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";
// import { businessPositions } from '../../store/position';
import './searchResults.css';
import ratingStarFilled from '../../images/rating-star-filled-1.png';
import ratingStarEmpty from '../../images/rating-star-empty-1.png';


const SearchResults = () => {
    const businesses = useSelector(state => state.business);
    const history = useHistory();
    // const dispatch = useDispatch();
    const [APIKey, setAPIKey] = useState('');
    // const positions = useSelector(state => state.position);
    const [positions, setPositions] = useState({})
    // const [center, setCenter] = useState({lat: 29.879444, lng: -97.938889});
    const [isHovering, setIsHovering] = useState(-1);

    const handleMouseOver = (businessId) => {
        setIsHovering(businessId);
    };

    const handleMouseOut = () => {
        setIsHovering(-1);
    };

 //   Geocode
 Geocode.setApiKey(APIKey);
 Geocode.setLanguage("en");
 Geocode.setRegion("us");
 Geocode.setLocationType("ROOFTOP");
 Geocode.enableDebug();

    useEffect(() => {
        fetch('/api/businesses/googleAPIKey').then( async (response) => {
            const data = await response.json()
            setAPIKey(data["googleApiKey"])
        })
    },[])


    let total_businesses = Object.keys(businesses).length;
    useEffect( async () => {


            if (APIKey) {
                const latLngs = {};
                for(let i = 0; i < total_businesses; i++) {
                    let business = Object.values(businesses)[i]
                    const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zipcode}`;
                        // Get latitude & longitude from address.
                        try {
                            const response = await Geocode.fromAddress(businessAddress);
                            if (response.status === 'OK') {
                                    const { lat, lng } = response.results[0].geometry.location;
                                    latLngs[business.id] = {lat, lng};
                            }
                        } catch(error) {

                            alert(`Can not get the lat and lng of this address: ${businessAddress}.`);
                        }
                }
                setPositions(latLngs)

            }

    }, [businesses, APIKey])




    let businessList = [];

    if (total_businesses > 0) {
        businessList = Object.values(businesses);
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

        return [averRating, totalReviews]
    }

    const phoneNumberFormat = (phoneNumber) => {
        return `(${phoneNumber.slice(0,3)})${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`
    }


    const containerStyle = {
        width: '40vw',
        height: '70vh'
      };


    const defaultCenter = {lat: 29.879444, lng: -97.938889};
    const locationIds = Object.keys(positions);
    const businessIndex = {};



    return ( businesses &&
        <div className='search-result-container'>
            <h2>{total_businesses} {total_businesses === 1 ? 'Result' : 'Results'} Found.</h2>
            <div className='search-result-content-container'>
                <div className= 'search-result-left-container' >
                    {businessList.map((business, index) => {
                        businessIndex[business.id] = index + 1;
                        return (
                        <div key={business.id} id= {isHovering === business.id ? 'onHover' : ''} className={'search-result-detail-container' } onMouseOver={() => handleMouseOver(business.id)} onMouseOut={handleMouseOut}>
                            {business.images.length > 0 && <img className='search-result-image' src={business.images[0].url} />}
                            <div className='search-result-detail-right-container'>
                                <h3 className='search-result-business-name' onClick={() => { history.push(`/businesses/${business.id}`) }}>{index + 1}. {business.name}</h3>
                                <div className='search-result-busi-review'>
                                    <div className='search-result-busi-rating'>
                                        <div className='busi-review-star-container'>
                                            {[1, 2, 3, 4, 5].map(ele => {
                                                return (
                                                    <div key={ele} >
                                                        {businessRating(business)[0] >= ele ? <img alt='' src={ratingStarFilled} /> : <img alt='' src={ratingStarEmpty} />}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <p>{businessRating(business)[0]}</p>
                                    </div>


                                    <p>{businessRating(business)[1]} {businessRating(business)[1] === 1 ? 'Review' : 'Reviews'}</p>
                                </div>
                                <p>{phoneNumberFormat(business.phoneNumber)}</p>
                                <div className='search-result-business-address'>
                                    {business.address}, {business.city}, {business.state}
                                </div>
                            </div>
                        </div>
                    )})}
                </div>

                <div className='search-result-map-container'>
                    {APIKey &&
                        <LoadScript googleMapsApiKey={APIKey}>
                            <GoogleMap mapContainerStyle={containerStyle} zoom={13} center={locationIds.length > 0 ? positions[isHovering === -1 ? locationIds[0] : isHovering] : defaultCenter}>

                                {locationIds.map((locationId) => {
                                    return (<Marker icon={Number(locationId)  === isHovering  ? "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2BC032 " : null} className="google-map-marker" key={positions[locationId].lat + positions[locationId].lng} position={positions[locationId]} label={{text: businessIndex[locationId] ? String(businessIndex[locationId]): '', color:'white'}} />
                                )})}
                            </GoogleMap>
                        </LoadScript>
                    }
                </div>

            </div>

        </div>
    )

}


export default SearchResults;
