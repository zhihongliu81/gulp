import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchBusinessThunk } from '../../store/business';

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        let city;
        let state;
        let url;
        const trimedName = name.trim()
        const cityAndState = location.split(',')
        if (cityAndState.length === 1) {
            city = location.trim()
            url = `name=${trimedName}&city=${city}`
        } else {
            city = cityAndState[0].trim();
            state = cityAndState[1].trim();
            url = `name=${trimedName}&city=${city}&state=${state}`
        }

        dispatch(searchBusinessThunk(url)).then(() => history.push('/businesses/searchresults'))

    }

    return (
        <div>
            <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            ></input>
            <input
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
            ></input>
            <button onClick={handleSearch}>search</button>
        </div>
    )

}



export default SearchBar;
