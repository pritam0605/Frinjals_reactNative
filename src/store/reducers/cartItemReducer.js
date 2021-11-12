const initialState = {
  cart: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log('Add');
      //check if the action id exists in the addedItems
      let existed_item = state.cart.find(item => action.payload.id === item.id);
      if (existed_item) {
        ++existed_item.qty;
        return {...state, cart: [...state.cart]};
      } else {
        action.payload.qty = 1;
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case 'INCREASE_TO_CART':
      console.log('Inc');
      //check if the action id exists in the addedItems
      let increase_item = state.cart.find(
        item => action.payload.id === item.id,
      );
      --increase_item.qty;
      return {...state, cart: [...state.cart]};
    case 'SUB_TO_CART':
      console.log('Sub');
      //check if the action id exists in the addedItems
      let subs_item = state.cart.find(item => action.payload.id === item.id);
      --subs_item.qty;
      return {...state, cart: [...state.cart]};

    case 'EMPTY_CART':
      return {
        ...state,
        cart: [],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}
