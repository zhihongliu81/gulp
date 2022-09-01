const GET_ALL_REVIEWS = 'review/GET_ALL_REVIEWS'

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

export const getAllReviewsThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return;
        }
        dispatch(getAllReviews(data));
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            newState = action.reviews
            return newState
        }


      default:
        return state;
    }
  }
