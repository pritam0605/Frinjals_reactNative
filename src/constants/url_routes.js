import {App_Base_Url} from './index';
export default class Routes {
  static LoginWithGoogle = App_Base_Url + 'auth/logingoogle';
  static GetUserDetails = App_Base_Url + 'auth/data?api_token=';
  static LoginWithFB = App_Base_Url + 'auth/loginfb';
  static Check_Phone_Url = App_Base_Url + 'checkphone';
  static Check_Otp_Url = App_Base_Url + 'checkotp';
  static Check_Email_Url = App_Base_Url + 'checkemail';
  static Register_Url = App_Base_Url + 'register';
  static User_Address_List_Url = App_Base_Url + 'addresses?api_token=';
  static Add_Del_Address_Url = App_Base_Url + 'addresses?api_token=';
  static Delete_Address_Url = App_Base_Url + 'addresses/delete?api_token=';
  static User_Details_Url = App_Base_Url + 'auth/data?api_token';
  static Vendor_List_Url = App_Base_Url + 'vendor/list/1';
  static Menu_List_Url = App_Base_Url + 'vendor/';
  static Coupon_List_Url = App_Base_Url + 'couponlist';
  static Featured_Product_List_Url = App_Base_Url + 'featured_product';
  static Today_Special_List_Url = App_Base_Url + 'today_special';
  static Banner_List_Url = App_Base_Url + 'banner_list';
  static Create_New_Order_Url = App_Base_Url + 'orders?api_token=';
  static Forgot_Password_Url = App_Base_Url + 'forget-password';
  static Validate_FP_Hash_Url = App_Base_Url + 'validate-fp-hash';
  static Reset_Password_Url = App_Base_Url + 'reset-password';
  static Verify_Email_Url = App_Base_Url + 'verify-email';
  static MyOrder_List_Url = App_Base_Url + 'orders?api_token=';
  static Update_Profile_Url = App_Base_Url + 'updateprofile';
}
