export const setOrderType = item => dispatch => {
  dispatch({
    type: 'OrderType_Set',
    payload: item,
  });
};
export const clearOrderType = () => dispatch => {
  dispatch({
    type: 'OrderType_Clear',
  });
};
export const selectVendor = item => dispatch => {
  dispatch({
    type: 'Vendor_Set',
    payload: item,
  });
};
export const clearVendor = () => dispatch => {
  dispatch({
    type: 'Vendor_Clear',
  });
};
export const setAddress = item => dispatch => {
  dispatch({
    type: 'Address_Set',
    payload: item,
  });
};
export const setDeliveryType = type => dispatch => {
  dispatch({
    type: 'DELIVERY_TYPE',
    payload: type,
  });
};
export const selectDefaultAddress = id => dispatch => {
  dispatch({
    type: 'SELECT_ADDRESS',
    payload: id,
  });
};
export const sortMenuItem = (type, order) => dispatch => {
  dispatch({
    type: 'SORT_MENU',
    payload: {type, order},
  });
};
