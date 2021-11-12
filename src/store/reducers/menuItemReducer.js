// Initial State
const initialState = {
  menuItem: [],
  cartItem: [],
  cartId: null,
};
// Reducers (Modifies The State And Returns A New State)
const menuItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Items': {
      return {
        ...state,
        menuItem: action.payload,
      };
    }
    case 'SORT_MENU': {
      // console.log('SORT_MENU');
      const {type, order} = action.payload;
      if (type === 'price' && order) {
        return {
          ...state,
          menuItem: [
            ...state.menuItem.slice().sort((a, b) => a.price > b.price),
          ],
        };
      } else if (type === 'price' && !order) {
        console.log('ELSE if', type, order);
        return {
          ...state,
          menuItem: [
            ...state.menuItem.slice().sort((a, b) => b.price > a.price),
          ],
        };
      } else if (type === 'name' && order) {
        console.log('ELSE if', type, order);
        return {
          ...state,
          menuItem: [...state.menuItem.slice().sort((a, b) => a.name > b.name)],
        };
      } else if (type === 'name' && !order) {
        console.log('ELSE if', type, order);
        return {
          ...state,
          menuItem: [...state.menuItem.slice().sort((a, b) => b.name > a.name)],
        };
      } else {
        console.log('Else');
        return {
          ...state,
          menuItem: [...state.menuItem.slice().sort((a, b) => b.name > a.name)],
        };
      }
    }
    case 'ADD_TO_CART':
      //check if the action id exists in the addedItems
      let existed_item = state.cartItem.find(
        item => action.payload.item.id === item.id,
      );
      if (existed_item) {
        ++existed_item.qty;
        return {...state, ...state.menuItem, cartItem: [...state.cartItem]};
      } else {
        action.payload.item.qty = 1;
        return {
          ...state,
          ...state.menuItem,
          cartItem: [...state.cartItem, action.payload.item],
          cartId: action.payload.cartId,
        };
      }

    case 'INCREASE_TO_CART':
      //check if the action id exists in the addedItems
      let increase_item = state.cartItem.find(
        item => action.payload.id === item.id,
      );
      --increase_item.qty;
      return {...state, ...state.menuItem, cartItem: [...state.cartItem]};
    case 'SUB_TO_CART':
      //check if the action id exists in the addedItems
      let subs_item = state.cartItem.find(
        item => action.payload.id === item.id,
      );
      --subs_item.qty;
      return {...state, ...state.menuItem, cartItem: [...state.cartItem]};

    case 'EMPTY_CART':
      return {
        ...state,
        ...state.menuItem,
        cartItem: [],
        cartId: null,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        ...state.menuItem,
        cartItem: state.cartItem.filter(item => item.id !== action.payload.id),
      };
    // case 'ADD_TO_CART':
    //   let addedItem = action.payload;
    //   let existed_item = state.menuItem.find(item => addedItem.id === item.id);
    //   ++existed_item.qty;
    //   return {...state, menuItem: [...state.menuItem]};

    // case 'INCREASE_TO_CART':
    //   console.log('Inc');
    //   //check if the action id exists in the addedItems
    //   let increase_item = state.menuItem.find(
    //     item => action.payload.id === item.id,
    //   );
    //   ++increase_item.qty;
    //   return {...state, menuItem: [...state.menuItem]};
    // case 'SUB_TO_CART':
    //   console.log('Sub');
    //   //check if the action id exists in the addedItems
    //   let subs_item = state.menuItem.find(
    //     item => action.payload.id === item.id,
    //   );
    //   --subs_item.qty;
    //   return {...state, menuItem: [...state.menuItem]};

    // case 'REMOVE_FROM_CART':
    //   //check if the action id exists in the addedItems
    //   let existed_itemr = state.menuItem.find(
    //     item => action.payload.id === item.id,
    //   );
    //   existed_itemr.qty = 0;
    //   return {...state, menuItem: [...state.menuItem]};
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default menuItemReducer;
