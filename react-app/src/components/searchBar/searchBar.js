import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchBusinessThunk } from '../../store/business';
import './searchBar.css';
import searchIcon from '../../images/search-icon.jpg'

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const STATE = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
                   'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
                   'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
                   'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
                   'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

    const STATEOBJ = {
        Alabama: 'AL',
        Alaska: 'AK',
        Arizona: 'AZ',
        Arkansas: 'AR',
        California: 'CA',
        Colorado: 'CO',
        Connecticut: 'CT',
        Delaware: 'DE',
        Florida: 'FL',
        Georgia: 'GA',
        Hawaii:'HI',
        Idaho: 'ID',
        Illinois: 'IL',
        Indiana: 'IN',
        Iowa: 'IA',
        Kansas: 'KS',
        Kentucky: 'KY',
        Louisiana: 'LA',
        Maine: 'ME',
        Maryland: 'MD',
        Massachusetts: 'MA',
        Michigan: 'MI',
        Minnesota: 'MN',
        Mississippi: 'MS',
        Missouri: 'MO',
        Montana: 'MT',
        Nebraska: 'NE',
        Nevada: 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        Ohio: 'OH',
        Oklahoma: 'OK',
        Oregon: 'OR',
        Pennsylvania: 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        Tennessee: 'TN',
        Texas: 'TX',
        Utah: 'UT',
        Vermont: 'VT',
        Virginia: 'VA',
        Washington: 'WA',
        'West Virginia': 'WV',
        Wisconsin: 'WI',
        Wyoming: 'WY'
    }
    const handleSearch = (e) => {
        e.preventDefault();
        let city;
        let state;
        let url;
        const trimedName = name.trim()
        const cityAndState = location.split(',')
        if (cityAndState.length === 1) {
            const newStr = cityAndState[0].split(' ')
            .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
            .join(' ');
            if (newStr in STATEOBJ) {
                state = STATEOBJ[newStr]
                url = `name=${trimedName}&state=${state}`
            }
            else if (STATE.includes(cityAndState[0].trim().toUpperCase())) {
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
