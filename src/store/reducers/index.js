// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import addressReducer from './addressReducer';
import authReducer from './authReducer';
import cartItemReducer from './cartItemReducer';
import commonReducer from './commonReducer';
import menuItemReducer from './menuItemReducer';
import orderReducer from './orderReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer: authReducer,
  addressReducer: addressReducer,
  orderReducer: orderReducer,
  menuReducer: menuItemReducer,
  // cartReducer: cartItemReducer,
  common: commonReducer,
});
// Exports
export default rootReducer;
