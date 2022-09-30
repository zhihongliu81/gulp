const GET_ALL_BUSINESSES = 'business/GET_ALL_BUSINESSES'
const GET_BUSINESS_DETAIL = 'business/GET_BUSINESS_DETAIL'
const CREATE_BUSINESS = 'business/CREATE_BUSINESS'
const EDIT_BUSINESS = 'business/EDIT_BUSINESS'
const DELETE_BUSINESS = 'business/DELETE_BUSINESS'
const SEARCH_BUSINESS = 'business/SEARCH_BUSINESS'


const getAllBusinesses = (businesses) => {
    return {
        type: GET_ALL_BUSINESSES,
        businesses
    }
}

const getBusinessDetail = (business) => {
    return {
        type: GET_BUSINESS_DETAIL,
        business
    }
}

const createBusiness = (business) => {
    return {
        type: CREATE_BUSINESS,
        business
    }
}

const editBusiness = (business) => {
    return {
        type: EDIT_BUSINESS,
        business
    }
}

const deleteBusiness = (businessId) => {
    return {
        type: DELETE_BUSINESS,
        businessId
    }
}

const searchBusiness = (businesses) => {
    return {
        type: SEARCH_BUSINESS,
        businesses
    }
}



export const getAllBusinessesThunk = () => async (dispatch) => {
    const response = await fetch('/api/businesses/');
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return;
        }
        dispatch(getAllBusinesses(data));
      }
}

export const getBusinessDetailThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return;
        }
        dispatch(getBusinessDetail(data));
      }
}

export const createBusinessThunk = (newBusiness) => async (dispatch) => {

    const response = await fetch('/api/businesses/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBusiness)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createBusiness(data));
        return data
    }

    const res = await response.json();

    return res
}

export const editBusinessThunk = (business) => async dispatch => {
    const response = await fetch(`/api/businesses/${business.id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(business)
    });

    const res = await response.json()
    if (response.ok) {
        dispatch(editBusiness(res));
    }
    return res
}

export const deleteBusinessThunk = (businessId) => async dispatch => {
    const response = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteBusiness(businessId))
      }
      return response
}

export const searchBusinessThunk = (url) => async dispatch => {
    const response = await fetch(`/api/businesses/search?${url}`);
    const res = await response.json();

    if (response.ok) {
        dispatch(searchBusiness(res));
    }
    return res
}



const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_BUSINESSES: {
            newState = action.businesses
            return newState
        }
        case GET_BUSINESS_DETAIL: {
            newState = {...state}
            newState[action.business.id] = action.business
            return newState
        }
        case CREATE_BUSINESS: {
            newState = {...state}
            newState[action.business.id] = action.business
            return newState
        }
        case EDIT_BUSINESS: {
            newState = {...state}
            newState[action.business.id] = action.business
            return newState
        }
        case DELETE_BUSINESS: {
            newState = {...state}
            delete newState[action.businessId]
            return newState
        }
        case SEARCH_BUSINESS: {

            newState = action.businesses
            return newState
        }


      default:
        return state;
    }
  }
