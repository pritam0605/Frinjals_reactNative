import Routes from '../../constants/url_routes';
import * as Sentry from '@sentry/react-native';
export const appAction = {
  getAddressList: () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(
        Routes.User_Address_List_Url + getState().authReducer?.token,
        {
          method: 'GET',
        },
      )
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {data, status, errMsg} = response;
          if (status) {
            dispatch({type: 'ADD_LIST', payload: data});
            resolve(status);
          } else {
            reject(errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'getAddressList', error});
          reject(error);
        });
      // setTimeout(() => resolve(true), 1000);
    });
  },
  deleteAddress: id => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(
        Routes.Delete_Address_Url + getState().authReducer?.token + '&id=' + id,
        {
          method: 'POST',
        },
      )
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, errMsg} = response;
          if (status) {
            dispatch({type: 'DEL_ADD', payload: id});
            resolve(errMsg);
          } else {
            reject(errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'deleteAddress', error});
          reject(error);
        });
    });
  },
  addDeliveryAddress: data => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Add_Del_Address_Url + getState().authReducer?.token, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => {
          Sentry.captureException({func: 'addDeliveryAddress', error});
          reject(error);
        });
    });
  },
  createOrder: data => (dispatch, getState) => {
    // console.log(Routes.Create_New_Order_Url + getState().authReducer?.token);
    return new Promise((resolve, reject) => {
      return fetch(
        Routes.Create_New_Order_Url + getState().authReducer?.token,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
        },
      )
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => {
          Sentry.captureEvent({func: 'createOrder', error});
          reject(error);
        });
    });
  },
  getOrderList: () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.MyOrder_List_Url + getState().authReducer?.token, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          res.status && resolve(res.data);
          !res.status && reject(res.errMsg);
        })
        .catch(error => {
          Sentry.captureException({func: 'getCouponList', error});
          reject(error);
        });
    });
  },
  getCouponList: data => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Coupon_List_Url, {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(res => {
          res.status && resolve(res.data);
          !res.status && reject(res.errMsg);
        })
        .catch(error => {
          Sentry.captureException({func: 'getCouponList', error});
          reject(error);
        });
    });
  },
  updateProfileInfo: data => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Update_Profile_Url, {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(res => {
          if (res.status) {
            dispatch({type: 'LOGIN', payload: res.data});
            resolve(true);
          } else if (!res.status) {
            reject(res.errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'getCouponList', error});
          reject(error);
        });
    });
  },
  getFeaturedProductList: data => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Featured_Product_List_Url, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          res.status && resolve(res.data);
          !res.status && reject(res.errMsg);
        })
        .catch(error => {
          Sentry.captureException({func: 'getFeaturedProductList', error});
          reject(error);
        });
    });
  },
  getTodaySpecialList: data => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Today_Special_List_Url, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          const {status, data, errMsg} = res;
          if (status) {
            var temp = [];
            var cartItem = getState().menuReducer?.cartItem;
            // console.log(JSON.stringify(cartItem));
            if (cartItem.length > 0) {
              data.map(e => {
                e.map(i => {
                  let inCart = cartItem.find(ci => ci.id === i.id);
                  if (inCart) {
                    i.qty = inCart.qty;
                  } else {
                    i.qty = 0;
                  }
                  temp.push(i);
                });
              });
            } else {
              data.map(e => {
                e.qty = 0;
                temp.push(e);
              });
            }
            dispatch({type: 'Items', payload: temp});
            resolve();
          } else {
            reject('err');
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'getTodaySpecialList', error});
          reject(error);
        });
    });
  },
  getHomeBannerList: data => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Banner_List_Url, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          // console.log(JSON.stringify(res));
          res.status && resolve(res.data);
          !res.status && reject(res.errMsg);
        })
        .catch(error => {
          Sentry.captureException({func: 'getHomeBannerList', error});
          reject(error);
        });
    });
  },
  getVendorList: () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Vendor_List_Url, {
        method: 'GET',
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, data, errMsg} = response;
          if (status) {
            resolve(data);
          } else {
            reject(errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'getVendorList', error});
          reject(error);
        });
      // setTimeout(() => resolve(true), 1000);
    });
  },
  getMenuList: id => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Menu_List_Url + id + '/items', {
        method: 'GET',
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, data, errMsg} = response;
          if (status) {
            var temp = [];
            var cartItem = getState().menuReducer?.cartItem;
            // console.log(JSON.stringify(cartItem));
            if (cartItem.length > 0) {
              data.map(e => {
                e.map(i => {
                  let inCart = cartItem.find(ci => ci.id === i.id);
                  if (inCart) {
                    i.qty = inCart.qty;
                  } else {
                    i.qty = 0;
                  }
                  temp.push(i);
                });
              });
            } else {
              data.map(e => {
                e.map(i => {
                  i.qty = 0;
                  temp.push(i);
                });
              });
            }
            dispatch({type: 'Items', payload: temp});
            resolve();
          } else {
            reject('err');
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'getMenuList', error});
          reject(error);
        });
      // setTimeout(() => resolve(true), 1000);
    });
  },
};
