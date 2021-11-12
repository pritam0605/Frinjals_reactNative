import Routes from '../../constants/url_routes';
import * as Sentry from '@sentry/react-native';
import {isValidEmail} from '../../utils';
// Login
export const authAction = {
  loginWithGoogle: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.LoginWithGoogle, {
        method: 'POST',
        body: data,
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, token, id, msg} = response;
          dispatch({type: 'TOKEN', payload: token});
          resolve({status, token, id, msg});
        })
        .catch(error => {
          console.log('Error: ', error);
          Sentry.captureException({func: 'loginWithGoogle', error});
          reject('failed');
        });
    });
  },
  getUserDetails: () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.GetUserDetails + getState().authReducer?.token, {
        method: 'GET',
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, msg, data} = response;
          if (status) {
            dispatch({type: 'LOGIN', payload: data});
            resolve(msg);
          } else {
            reject(msg);
          }
        })
        .catch(error => {
          console.log('Error: ', error);
          Sentry.captureException({func: 'loginWithGoogle', error});
          reject('failed');
        });
    });
  },
  checkPhone: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Check_Phone_Url, {
        method: 'POST',
        body: data,
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, errMsg, phone, otp_time, otp, token} = response;
          dispatch({type: 'TOKEN', payload: token});
          resolve({status, phone, otp_time, errMsg, otp, token});
        })
        .catch(error => {
          Sentry.captureException({func: 'doLogin', error});
          reject('failed');
        });
    });
  },
  doVerifyOtp: body => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Check_Otp_Url, {
        method: 'POST',
        body,
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, errMsg, data} = response;
          if (status) {
            if (isValidEmail(data.email)) {
              dispatch({type: 'LOGIN', payload: data});
              resolve({message: errMsg, email: true});
            } else {
              resolve({message: errMsg, email: false, data});
            }
          } else {
            reject(errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doValidateEmailHash', error});
          reject('failed');
        });
    });
  },
  doSubmitEmail: fData => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Check_Email_Url, {
        method: 'POST',
        body: fData,
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, errMsg, data} = response;
          if (status) {
            dispatch({type: 'LOGIN', payload: data});
            resolve({message: errMsg, email: true});
          } else {
            reject(errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doValidateEmailHash', error});
          reject('failed');
        });
    });
  },
  doForgot: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Forgot_Password_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doForgot', error});
          reject('Failed');
        });
    });
  },
  doResetPassword: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Reset_Password_Url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          const {status, message} = response;
          if (status) {
            resolve(message);
          } else {
            reject(message);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doResetPassword', error});
          reject('failed');
        });
    });
  },
  doRegister: data => dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(Routes.Register_Url, {
        method: 'POST',
        body: data,
      })
        .then(rawResponse => rawResponse.json())
        .then(response => {
          console.log(JSON.stringify(response));
          const {status, errMsg, phone, otp_time, otp, token} = response;
          if (status) {
            resolve({status, phone, otp_time, otp, token});
          } else {
            reject(errMsg);
          }
        })
        .catch(error => {
          Sentry.captureException({func: 'doSignUp', error});
          reject(error);
        });
    });
  },
  doLogout: () => dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Sentry.configureScope(scope => scope.setUser(null));
        dispatch({type: 'LOGOUT'});
        resolve('Success');
      }, 1000);
    });
  },
};
