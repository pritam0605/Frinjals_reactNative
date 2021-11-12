/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import CustomSidebarMenu from '../components/custom_sidebar_menu';

import LoginScreen from '../screens/login_screen';
import RegisterScreen from '../screens/register_screen';
import ForgotPasswordScreen from '../screens/forgot_password_screen';
import ResetPasswordScreen from '../screens/reset_password_screen';
import OtpVerifyScreen from '../screens/otp_verify_screen';
import EmailInputScreen from '../screens/email_input_screen';
import HomeScreen from '../screens/home_screen';
import MyOrderScreen from '../screens/my_order_screen';
import ProfileScreen from '../screens/profile_screen';
import AddressListScreen from '../screens/address_list_screen';
import ContactUsScreen from '../screens/contact_us_screen';
import VendorScreen from '../screens/vendor_screen';
import MenuScreen from '../screens/menu_screen';
import TermsScreen from '../screens/terms_&_condition_screen';
import PrivacyScreen from '../screens/privacy_screen';
import AllOfferScreen from '../screens/all_offer_screen';
import TodaySpecialScreen from '../screens/today_special_screen';
import CartScreen from '../screens/cart_screen';
import OrderDetailScreen from '../screens/order_details_screen';
import OrderConfirmationScreen from '../screens/order_confirmation_screen';
import CustomizedScreen from '../screens/customized_screen';
import TrackOrderScreen from '../screens/track_order_screen';
import OrderStatusScreen from '../screens/order_status_screen';

// Deeplinking
import linking from '../deeplink';

const StackScreen = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppHome = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        unmountOnBlur: true,
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Orders"
        component={MyOrderScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen
        name="Address"
        component={AddressListScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      <Drawer.Screen name="Terms" component={TermsScreen} />
      <Drawer.Screen name="Privacy" component={PrivacyScreen} />
    </Drawer.Navigator>
  );
};
const Navigation = () => {
  const auth = useSelector(state => state.authReducer.user);
  // const dispatch = useDispatch();
  React.useEffect(() => {
    // auth !== null && dispatch(appAction.initializeForToday({user_id: auth.id}));
    SplashScreen.hide();
  }, [auth]);
  return (
    <NavigationContainer linking={linking}>
      <StackScreen.Navigator
        initialRouteName={auth === null ? 'login' : 'dashboard'}>
        <StackScreen.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="forgot"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="reset"
          component={ResetPasswordScreen}
          options={{headerShown: false}}
          initialParams={{}}
        />
        <StackScreen.Screen
          name="otpverify"
          component={OtpVerifyScreen}
          options={{headerShown: false}}
          initialParams={{}}
        />
        <StackScreen.Screen
          name="emailInput"
          component={EmailInputScreen}
          options={{headerShown: false}}
          initialParams={{}}
        />
        <StackScreen.Screen
          name="dashboard"
          component={AppHome}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="vendor"
          component={VendorScreen}
          options={{headerShown: false, unmountOnBlur: true}}
        />
        <StackScreen.Screen
          name="menu"
          component={MenuScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="allOffer"
          component={AllOfferScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="todaySpecial"
          component={TodaySpecialScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="cartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="orderDetail"
          component={OrderDetailScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="orderStatus"
          component={OrderStatusScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="orderConfirmation"
          component={OrderConfirmationScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="myaddresslist"
          component={AddressListScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="customized"
          component={CustomizedScreen}
          options={{headerShown: false}}
        />
        <StackScreen.Screen
          name="trackorder"
          component={TrackOrderScreen}
          options={{headerShown: false}}
        />
      </StackScreen.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
