import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { GoogleMap, Marker, LoadScript, MarkerClusterer } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { businessPositions } from '../../store/position';
import './searchResults.css';


const SearchResults = () => {
    const businesses = useSelector(state => state.business);
    const history = useHistory();
    const dispatch = useDispatch();
    const [APIKey, setAPIKey] = useState('');
    const positions = useSelector(state => state.position);
    // const [center, setCenter] = useState({lat: 29.879444, lng: -97.938889});

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
                 dispatch(businessPositions(latLngs));

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

        return averRating
    }

    const phoneNumberFormat = (phoneNumber) => {
        return `(${phoneNumber.slice(0,3)})${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`
    }


    const containerStyle = {
        width: '400px',
        height: '400px'
      };


    const defaultCenter = {lat: 29.879444, lng: -97.938889}
    const locationIds = Object.keys(positions)



    return ( businesses &&
        <div className='search-result-container'>
            <h2>{total_businesses} {total_businesses === 1 ? 'Result' : 'Results'} Found.</h2>
            {businessList.map(business => (
                <div key={business.id} className='business-list-detail-container'>
                    {business.images.length > 0 && <img className='business-list-image' src={business.images[0].url} />}
                    <div className='business-list-detail-right-container'>
                        <h3 className='business-list-name' onClick={() => { history.push(`/businesses/${business.id}`) }}>{business.name}</h3>
                        <Rating initialValue={businessRating(business)} allowHalfIcon={true} readonly={true} />
                        <p>{phoneNumberFormat(business.phoneNumber)}</p>
                        <p>{business.address}, {business.city}, {business.state}</p>

                    </div>
                </div>
            ))}
            <div>
                {APIKey &&
                    <LoadScript googleMapsApiKey={APIKey}>
                        <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={locationIds.length > 0 ? positions[locationIds[0]] : defaultCenter}>

                            {locationIds.map((locationId) => (
                                <Marker icon={{url:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}} className="google-map-marker" key={positions[locationId].lat + positions[locationId].lng} position={positions[locationId]} label={businesses[locationId]?.name.slice(0, 3)}/>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                }
            </div>
        </div>
    )

}


export default SearchResults;
