const GET_ALL_IMAGES = 'images/GET_ALL_IMAGES'

const getAllImages = (images) => {
    return {
        type: GET_ALL_IMAGES,
        images
    }
}

export const getAllImagesThunk = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
          return;
        }
        dispatch(getAllImages(data));
    }
}


const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_IMAGES:
            newState = action.images
            return newState


      default:
        return state;
    }
  }
