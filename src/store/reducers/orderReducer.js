// Initial State
const initialState = {
  orders: [],
};
// Reducers (Modifies The State And Returns A New State)
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default orderReducer;
