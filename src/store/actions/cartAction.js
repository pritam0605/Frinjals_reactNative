export const addToCart = (item, cartId) => dispatch => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: {item, cartId},
  });
};
export const increaseToCart = item => dispatch => {
  dispatch({
    type: 'INCREASE_TO_CART',
    payload: item,
  });
};
export const subToCart = item => dispatch => {
  dispatch({
    type: 'SUB_TO_CART',
    payload: item,
  });
};
export const removeItem = item => dispatch => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: item,
  });
};
export const emptyCart = () => dispatch => {
  dispatch({
    type: 'EMPTY_CART',
  });
};
