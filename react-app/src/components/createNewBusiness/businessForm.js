import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import UploadPicture from "./uploadPicture";
import { createBusinessThunk } from "../../store/business";


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
    const [minPrice, setMinPrice] = useState(action === 'create' ? 0 : business.minPrice)
    const [maxPrice, setMaxPrice] = useState(action === 'create' ? 0 : business.maxPrice)

    const [images, setImages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        console.log("country", country)
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

        dispatch(createBusinessThunk(newBusiness))
        .then(
            (res) => {
                if (res.errors) {
                    console.log('res.errors', res.errors)
                    setErrors(res.errors)
                } else {
                    history.push(`/businesses/${res.id}`)
                }
            }
        )

    }



    const STATE = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY']

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                    type="text"
                    name="name"
                    onChange={e => {setName(e.target.value)}}
                    value={name}
                    placeholder='Business Name'
                    ></input>
                </div>
                <div>
                    <label>Address</label>
                    <input
                    type="text"
                    name="address"
                    onChange={e => {setAddress(e.target.value)}}
                    value={address}
                    placeholder='Address'
                    ></input>
                </div>
                <div>
                    <label>City</label>
                    <input
                    type="text"
                    name="city"
                    onChange={e => {setCity(e.target.value)}}
                    value={city}
                    placeholder='City'
                    ></input>
                </div>
                <div>
                    <label>State</label>
                    <select
                    onChange={e => {setState(e.target.value)}}
                    value={state}
                    >
                        <option value='' disabled>
                            Select a state...
                        </option>
                        {STATE.map(ele => {
                            return <option key={ele}>{ele}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>Zipcode</label>
                    <input
                    type="text"
                    name="zipcode"
                    onChange={e => {setZipcode(e.target.value)}}
                    value={zipcode}
                    placeholder='Five numbers. Ex: 12345'
                    ></input>
                </div>
                <div>
                    <label>Country</label>
                    <select
                    onChange={e => {setCountry(e.target.value)}}
                    value={country}
                    >
                        <option value='' disabled>
                            Select a country...
                        </option>
                        <option>US</option>
                    </select>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                    type="text"
                    name="phone number"
                    onChange={e => {setPhoneNumber(e.target.value)}}
                    value={phoneNumber}
                    placeholder='Ten numbers. Ex: 1234567891'
                    ></input>
                </div>
                <div>
                    <label>Website</label>
                    <input
                    type="text"
                    name="website"
                    onChange={e => {setWebsite(e.target.value)}}
                    value={website}
                    placeholder='include http:// or https://'
                    ></input>
                </div>
                <div>
                    <label>Minimum Price</label>
                    <input
                    type="number"
                    name="minimum price"
                    onChange={e => {setMinPrice(e.target.value)}}
                    value={minPrice}
                    placeholder='number between 0 to 999. Ex: 10.25'
                    ></input>
                </div>
                <div>
                    <label>Maximum Price</label>
                    <input
                    type="number"
                    name="maximum price"
                    onChange={e => {setMaxPrice(e.target.value)}}
                    value={maxPrice}
                    placeholder='number between 0 to 999. Ex: 100.25'
                    ></input>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <UploadPicture setImages={setImages}/>
            </div>
        </div>
    )
}


export default BusinessForm;
