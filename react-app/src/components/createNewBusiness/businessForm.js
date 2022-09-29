import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import UploadPicture from "./uploadPicture";
import { createBusinessThunk, editBusinessThunk } from "../../store/business";
import './businessForm.css'


const BusinessForm = ({business, action}) => {
    const dispatch = useDispatch();
    const history =useHistory()

    const [errors, setErrors] = useState([]);

    const [name, setName] = useState(action === 'create' ? '' : business.name)
    const [address, setAddress] = useState(action === 'create' ? '' : business.address)
    const [city, setCity] = useState(action === 'create' ? '' : business.city)
    const [state, setState] = useState(action === 'create' ? '' : business.state)
    const [zipcode, setZipcode] = useState(action === 'create' ? '' : business.zipcode)
    const [country, setCountry] = useState(action === 'create' ? '' : business.country)
    const [phoneNumber, setPhoneNumber] = useState(action === 'create' ? '' : business.phoneNumber)
    const [website, setWebsite] = useState(action === 'create' ? '' : business.website)
    const [minPrice, setMinPrice] = useState(action === 'create' ? '' : business.minPrice)
    const [maxPrice, setMaxPrice] = useState(action === 'create' ? '' : business.maxPrice)
    const [images, setImages] = useState([])

    const [nameValidationErrors, setNameValidationErrors] = useState([]);
    const [addressValidationErrors, setAddressValidationErrors] = useState([]);
    const [cityValidationErrors, setCityValidationErrors] = useState([]);
    const [stateValidationErrors, setStateValidationErrors] = useState([]);
    const [zipcodeValidationErrors, setZipcodeValidationErrors] = useState([]);
    const [countryValidationErrors, setCountryValidationErrors] = useState([]);
    const [phoneNumberValidationErrors, setPhoneNumberValidationErrors] = useState([]);
    const [websiteValidationErrors, setWebsiteValidationErrors] = useState([]);
    const [minPriceValidationErrors, setMinPriceValidationErrors] = useState([]);
    const [maxPriceValidationErrors, setMaxPriceValidationErrors] = useState([]);
    const [imagesValidationErrors, setImagesValidationErrors] = useState([]);

    const [showNameErrors, setShowNameErrors] = useState(false);
    const [showAddressErrors, setShowAddressErrors] = useState(false);
    const [showCityErrors, setShowCityErrors] = useState(false);
    const [showStateErrors, setShowStateErrors] = useState(false);
    const [showZipcodeErrors, setShowZipcodeErrors] = useState(false);
    const [showCountryErrors, setShowCountryErrors] = useState(false);
    const [showPhoneNumberErrors, setShowPhoneNumberErrors] = useState(false);
    const [showWebsiteErrors, setShowWebsiteErrors] = useState(false);
    const [showMinPriceErrors, setShowMinPriceErrors] = useState(false);
    const [showMaxPriceErrors, setShowMaxPriceErrors] = useState(false);


    function onlyDigits(s) {
        for (let i = s.length - 1; i >= 0; i--) {
          const d = s.charCodeAt(i);
          if (d < 48 || d > 57) return false
        }
        return true
      }

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if(name.length === 0) errors.push("Name is required");
        if(name.length > 50 ) errors.push("Name must be 50 characters or less");
        setNameValidationErrors(errors);
    }, [name])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (address.length === 0) errors.push("Address is required");
        if (address.length > 255) errors.push("Address must be 255 characters or less")
        setAddressValidationErrors(errors);
    }, [address])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (city.length === 0) errors.push("City is required");
        if (city.length > 50) errors.push("City must be 50 characters or less")
        setCityValidationErrors(errors);
    }, [city])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (state.length === 0) errors.push("State is required");
        setStateValidationErrors(errors);
    }, [state])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (zipcode.length !== 5) errors.push("Zipcode must be 5 numbers");
        if (!onlyDigits(zipcode)) errors.push("Only number allowed in zipcode")
        setZipcodeValidationErrors(errors);
    }, [zipcode])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (country.length === 0) errors.push("Country is required");
        setCountryValidationErrors(errors);
    }, [country])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (phoneNumber.length !== 10) errors.push("Phone number must be 10 numbers");
        if (!onlyDigits(phoneNumber)) errors.push("Only number in phone number")
        setPhoneNumberValidationErrors(errors);
    }, [phoneNumber])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (website.length === 0) errors.push("Website is required");
        if (!(website.includes('http://')) && !(website.includes('https://'))) errors.push('Website must include http:// or https://');
        if (website.length > 255) errors.push("Website must be 255 characters or less")
        setWebsiteValidationErrors(errors);
    }, [website])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (Number(minPrice) <= 0 || Number(minPrice) > 999.99) errors.push("Minimum price must between 0 and 999.99");
        setMinPriceValidationErrors(errors);
    }, [minPrice])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if (Number(maxPrice) <= 0 || Number(maxPrice) > 999.99) errors.push("Maximum price must between 0 and 999.99");
        if (Number(maxPrice) < Number(minPrice)) errors.push("Maximum price can't less than minimum price");
        setMaxPriceValidationErrors(errors);
    }, [minPrice, maxPrice])

    useEffect(() => {
        setErrors([]);
        const errors =[];
        if ( action === 'create' && images.length === 0) errors.push("Images are required");
        setImagesValidationErrors(errors);
    }, [images])


    let readyToSubmit;
    if (action === 'create') {
        readyToSubmit = nameValidationErrors.length === 0 &&
                        addressValidationErrors.length === 0 &&
                        cityValidationErrors.length === 0 &&
                        stateValidationErrors.length === 0 &&
                        zipcodeValidationErrors.length === 0 &&
                        countryValidationErrors.length === 0 &&
                        phoneNumberValidationErrors.length === 0 &&
                        websiteValidationErrors.length === 0 &&
                        minPriceValidationErrors.length === 0 &&
                        maxPriceValidationErrors.length === 0 &&
                        imagesValidationErrors.length === 0
    } else {
        readyToSubmit = nameValidationErrors.length === 0 &&
                        addressValidationErrors.length === 0 &&
                        cityValidationErrors.length === 0 &&
                        stateValidationErrors.length === 0 &&
                        zipcodeValidationErrors.length === 0 &&
                        countryValidationErrors.length === 0 &&
                        phoneNumberValidationErrors.length === 0 &&
                        websiteValidationErrors.length === 0 &&
                        minPriceValidationErrors.length === 0 &&
                        maxPriceValidationErrors.length === 0
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const newBusiness = {
            name,
            address,
            city,
            state,
            zipcode,
            country,
            phone_number: phoneNumber,
            website,
            min_price: minPrice,
            max_price: maxPrice,
            images
        };

        if (action === 'create') {

            dispatch(createBusinessThunk(newBusiness))
            .then(
                (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    } else {
                        history.push(`/businesses/${res.id}`)
                    }
                }
            )
        } else {
            newBusiness['id'] = business.id
            dispatch(editBusinessThunk(newBusiness))
            .then(
                (res) => {
                    if (res.errors) {
                        setErrors(res.errors)
                    } else {
                        history.push(`/businesses/${res.id}`)
                    }
                }
            )
        }

    }



    const STATE = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY']

    return (
        <div className="business-form-container">
            <form className="business-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} className='error'>{error}</li>
                    ))}
                </ul>
                <div className="business-form-input">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={e => { setName(e.target.value); setShowNameErrors(true) }}
                        value={name}
                        placeholder='Business Name'
                    ></input>
                    <>
                        {showNameErrors && nameValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        onChange={e => { setAddress(e.target.value);setShowAddressErrors(true) }}
                        value={address}
                        placeholder='Address'
                    ></input>
                    <>
                        {showAddressErrors && addressValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={e => { setCity(e.target.value); setShowCityErrors(true) }}
                        value={city}
                        placeholder='City'
                    ></input>
                    <>
                        {showCityErrors && cityValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>State</label>
                    <select
                        onChange={e => { setState(e.target.value); setShowStateErrors(true) }}
                        value={state}
                    >
                        <option value='' disabled>
                            Select a state...
                        </option>
                        {STATE.map(ele => {
                            return <option key={ele}>{ele}</option>
                        })}
                    </select>
                    <>
                        {showStateErrors && stateValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Zipcode</label>
                    <input
                        type="text"
                        name="zipcode"
                        onChange={e => { setZipcode(e.target.value); setShowZipcodeErrors(true) }}
                        value={zipcode}
                        placeholder='Five numbers. Ex: 12345'
                    ></input>
                    <>
                        {showZipcodeErrors && zipcodeValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Country</label>
                    <select
                        onChange={e => { setCountry(e.target.value); setShowCountryErrors(true) }}
                        value={country}
                    >
                        <option value='' disabled>
                            Select a country...
                        </option>
                        <option>US</option>
                    </select>
                    <>
                        {showCountryErrors && countryValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phone number"
                        onChange={e => { setPhoneNumber(e.target.value); setShowPhoneNumberErrors(true) }}
                        value={phoneNumber}
                        placeholder='Ten numbers. Ex: 1234567891'
                    ></input>
                    <>
                        {showPhoneNumberErrors && phoneNumberValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        onChange={e => { setWebsite(e.target.value); setShowWebsiteErrors(true) }}
                        value={website}
                        placeholder='include http:// or https://'
                    ></input>
                    <>
                        {showWebsiteErrors && websiteValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Minimum Price</label>
                    <input
                        type="number"
                        name="minimum price"
                        onChange={e => { setMinPrice(e.target.value); setShowMinPriceErrors(true) }}
                        value={minPrice}
                        placeholder='number between 0 to 999. Ex: 10.25'
                    ></input>
                    <>
                        {showMinPriceErrors && minPriceValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <div className="business-form-input">
                    <label>Maximum Price</label>
                    <input
                        type="number"
                        name="maximum price"
                        onChange={e => { setMaxPrice(e.target.value); setShowMaxPriceErrors(true) }}
                        value={maxPrice}
                        placeholder='number between 0 to 999. Ex: 100.25'
                    ></input>
                    <>
                        {showMaxPriceErrors && maxPriceValidationErrors.map((error, idx) => (
                            <li key={idx} className='error'>{error}</li>
                        ))}
                    </>
                </div>
                <button disabled={!readyToSubmit} className={readyToSubmit ?"business-form-submit-button": "business-form-submit-button-not-ready"} type="submit">Submit</button>
            </form>
            <div className="business-form-upload-image">
                <h3>Upload images: only .png, .jpg, .jpeg, and .gif accepted. </h3>
                <UploadPicture setImages={setImages} action={action} />
            </div>
        </div>
    )
}


export default BusinessForm;
