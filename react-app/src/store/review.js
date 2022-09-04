const GET_ALL_REVIEWS = 'review/GET_ALL_REVIEWS'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const UPDATE_REVIEW = 'review/UPDATE_REVIEW'

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const updateReview = (review) => {
    return {
        type:UPDATE_REVIEW,
        review
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

export const createReviewThunk = (businessId, review) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    const data = await response.json()
    if (response.ok) {
        dispatch(createReview(data))
    }
    return data
}

export const updateReviewThunk = (businessId, reviewId, review) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    const data = await response.json()
    if (response.ok) {
        dispatch(updateReview(data))
    }
    return data
}




const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            newState = action.reviews
            return newState
        }
        case CREATE_REVIEW: {
            newState = {...state}
            newState[action.review.id]=action.review
            return newState
        }
        case UPDATE_REVIEW: {
            newState = {...state}
            newState[action.review.id]=action.review
            return newState
        }


      default:
        return state;
    }
  }
