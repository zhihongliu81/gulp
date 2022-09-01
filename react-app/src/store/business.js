const GET_ALL_BUSINESSES = 'business/GET_ALL_BUSINESSES'
const GET_BUSINESS_DETAIL = 'business/GET_BUSINESS_DETAIL'

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

      default:
        return state;
    }
  }
