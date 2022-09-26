import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchBusinessThunk } from '../../store/business';
import './searchBar.css';
import searchIcon from '../../images/search-icon.jpg'

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const STATE = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY']

    const handleSearch = (e) => {
        e.preventDefault();
        let city;
        let state;
        let url;
        const trimedName = name.trim()
        const cityAndState = location.split(',')
        if (cityAndState.length === 1) {
            if (STATE.includes(cityAndState[0].trim().toUpperCase())) {
                state = location.trim()
                url = `name=${trimedName}&state=${state}`
            } else {
                city = location.trim()
                url = `name=${trimedName}&city=${city}`
            }

        } else {
            city = cityAndState[0].trim();
            state = cityAndState[1].trim();
            url = `name=${trimedName}&city=${city}&state=${state}`
        }

        dispatch(searchBusinessThunk(url)).then(() => history.push('/businesses/searchresults'))

    }

    return (
        <div className='search-bar-container'>
            <div className='search-bar-inputs'>
                <input
                    className='search-bar-name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='business name'
                ></input>
                <input
                    className='search-bar-location'
                    type='text'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder='Austin, TX'
                ></input>
            </div>

            {/* <button className='search-bar-button' onClick={handleSearch}>search</button> */}
            <img className='search-bar-icon' alt='search icon' src={searchIcon} onClick={handleSearch} />
        </div>
    )

}



export default SearchBar;
