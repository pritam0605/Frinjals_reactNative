// Initial State
const initialState = {
  orderType: '',
  vendor: {},
  address: null,
};
// Reducers (Modifies The State And Returns A New State)
const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OrderType_Set': {
      return {
        ...state,
        orderType: action.payload,
      };
    }
    case 'OrderType_Clear': {
      return {
        ...state,
        orderType: '',
      };
    }
    case 'Vendor_Set': {
      return {
        ...state,
        vendor: action.payload,
      };
    }
    case 'Vendor_Clear': {
      return {
        ...state,
        vendor: {},
      };
    }
    case 'Address_Set': {
      return {
        ...state,
        address: action.payload,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default commonReducer;
