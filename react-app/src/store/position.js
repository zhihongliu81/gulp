const BUSINESS_POSITIONS = 'business/BUSINESS_POSITIONS'

export const  businessPositions = (positions) => {

    return {
        type: BUSINESS_POSITIONS,
        positions
    }
}


const initialState = {}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case BUSINESS_POSITIONS: {
            newState = action.positions
            return newState
        }


      default:
        return state;
    }
  }
