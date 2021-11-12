// Initial State
const initialState = {
  deliveryAddress: [],
};
// Reducers (Modifies The State And Returns A New State)
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    }
    case 'DEL_ADD': {
      return {
        ...state,
        deliveryAddress: [
          ...state.deliveryAddress.filter(a => a.id !== action.payload),
        ],
      };
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default addressReducer;
