/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Keyboard,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Modal,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {isValidMobile} from '../utils/index';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import colors from '../themes/colors';
import CommonStyles, {initialLayout} from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {BackgroundPattern} from '../components/background_pattern';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';
import messaging from '@react-native-firebase/messaging';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import TermAndConditionScreen from './terms_&_condition_screen';
import PrivacyScreen from './privacy_screen';

const LoginScreen = ({...props}) => {
  const [mobile, setMobile] = useState(null); // 9932783472
  const [FBtoken, setFBToken] = useState(null);
  const [termsModal, setTermsModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  const _setTermsModal = () => {
    setTermsModal(true);
  };
  const _setPrivacyModal = () => {
    setPrivacyModal(true);
  };
  React.useEffect(() => {
    const checkPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();

      if (authorizationStatus) {
        messaging()
          .getToken()
          .then(fbtoken => {
            setFBToken(fbtoken);
          });
      }
    };
    GoogleSignin.configure();
    checkPermission();
  }, []);
  const fbLogin = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(JSON.stringify(result));
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const googleLogin = async () => {
    const userInfo = await GoogleSignin.signIn();
    let data = new FormData();
    data.append('email', userInfo.user.email);
    data.append('google_id', userInfo.user.id);
    data.append('name', userInfo.user.name);
    data.append('app_secret', 'frinjal');
    props
      .loginWithGoogle(data)
      .then(({status, token, id, msg}) => {
        if (status) {
          props.getUserDetails(token).then(res => {
            toastRef.current?.show(res, 1000, () => {
              props.navigation.reset({
                index: 0,
                routes: [{name: 'dashboard'}],
              });
            });
          });
        } else {
          toastRef?.current.show(msg, 1000);
        }
      })
      .catch(async e => await GoogleSignin.signOut());
  };
  const checkPhone = () => {
    if (!isValidMobile(mobile)) {
      toastRef.current?.show('Invalid mobile input', 1000);
    } else if (!agreeTerms) {
      toastRef.current?.show('You must agree our terms', 1000);
    } else {
      setIsLoading(true);
      let data = new FormData();
      data.append('phone_no', mobile);
      data.append('fbToken', FBtoken);
      // console.log(JSON.stringify(data));
      props
        .checkPhone(data)
        .then(({phone, otp_time, otp, token, errMsg}) => {
          toastRef.current?.show('OTP Sent', 1000, () => {
            props.navigation.navigate('otpverify', {
              phone,
              otp_time,
              otp,
              token,
            });
          });
        })
        .catch(e => toastErrorRef.current?.show(e, 1000))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <KeyboardAwareView>
      <BackgroundPattern>
        <SafeAreaView style={CommonStyles.safeAreaView}>
          <StatusBar backgroundColor={colors.color000} />
          <View style={styles.container}>
            <View style={styles.logoCont}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="center"
                resizeMethode="resize"
              />
            </View>
            <Pressable
              onPress={() => Keyboard.dismiss()}
              style={styles.lowerCont}>
              <Text allowFontScaling={false} style={CommonStyles.heading}>
                Sign In/ Register
              </Text>

              <View style={styles.inputCont}>
                <Text allowFontScaling={false} style={CommonStyles.inputLabel}>
                  Enter Your Mobile No:
                </Text>
                <View style={{height: 18}} />
                <TextInput
                  allowFontScaling={false}
                  value={mobile}
                  textContentType="telephoneNumber"
                  autoCapitalize="none"
                  returnKeyType="done"
                  onSubmitEditing={() => checkPhone()}
                  keyboardType="phone-pad"
                  onChangeText={text => setMobile(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
              <View style={CommonStyles.divider}>
                <View style={CommonStyles.hr} />
                <Text allowFontScaling={false} style={[CommonStyles.dividerL]}>
                  {'   '}
                  or{'   '}
                </Text>
                <View style={CommonStyles.hr} />
              </View>
              <View style={styles.socialCont}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={fbLogin}
                  style={styles.socialIconCont}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={require('../assets/icon/facebook.png')}
                    style={styles.socialIconCont}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={googleLogin}
                  style={styles.socialIconCont}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={require('../assets/icon/google.png')}
                    style={styles.socialIconCont}
                  />
                </TouchableOpacity>
                <View style={styles.socialIconCont}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={require('../assets/icon/instagram.png')}
                    style={styles.socialIconCont}
                  />
                </View>
                <View style={styles.socialIconCont}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={require('../assets/icon/twitter.png')}
                    style={styles.socialIconCont}
                  />
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  value={agreeTerms}
                  hideBox={true}
                  onValueChange={value => setAgreeTerms(value)}
                  tintColors={{true: colors.iconColor, false: colors.color70}}
                  animationDuration={0.5}
                  onAnimationType={'bounce'}
                  offAnimationType={'stroke'}
                />
                <View
                  style={{
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    paddingStart: 5,
                  }}>
                  <Text allowFontScaling={false} style={styles.terms}>
                    {'I agree to '}
                  </Text>
                  <TouchableOpacity onPress={_setTermsModal}>
                    <Text allowFontScaling={false} style={styles.terms}>
                      {'"Terms & Conditions"'}
                    </Text>
                  </TouchableOpacity>
                  <Text allowFontScaling={false} style={styles.terms}>
                    {' and '}
                  </Text>
                  <Pressable onPress={_setPrivacyModal}>
                    <Text allowFontScaling={false} style={styles.terms}>
                      {'"Privacy policy"'}
                    </Text>
                  </Pressable>
                  <Text allowFontScaling={false} style={styles.terms}>
                    {" of Frinjal's mobile app and website."}
                  </Text>
                </View>
              </View>
            </Pressable>

            <View style={styles.buttonCont}>
              <Pressable
                onPress={() => checkPhone()}
                disabled={isLoading}
                style={CommonStyles.btnLG}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.colorFFF} />
                ) : (
                  <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                    Continue
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
          <Toast ref={toastRef} position="bottom" />
          <Toast
            ref={toastErrorRef}
            position="bottom"
            style={{backgroundColor: colors.color000}}
          />
          <Modal
            onRequestClose={() => setTermsModal(false)}
            visible={termsModal}>
            <>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setTermsModal(false)}
                style={styles.header}>
                <Image
                  source={require('../assets/icon/close.png')}
                  style={{
                    marginHorizontal: 16,
                    width: 20,
                    height: 20,
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
              <TermAndConditionScreen />
            </>
          </Modal>
          <Modal
            onRequestClose={() => setPrivacyModal(false)}
            visible={privacyModal}>
            <>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setPrivacyModal(false)}
                style={styles.header}>
                <Image
                  source={require('../assets/icon/close.png')}
                  style={{
                    marginHorizontal: 16,
                    width: 20,
                    height: 20,
                    tintColor: '#fff',
                  }}
                />
              </TouchableOpacity>
              <PrivacyScreen />
            </>
          </Modal>
        </SafeAreaView>
      </BackgroundPattern>
    </KeyboardAwareView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  logoCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: initialLayout.height - 400,
  },
  lowerCont: {
    // height: 230,
    alignItems: 'center',
  },
  margin: {
    height: 30,
  },
  logo: {
    height: 121,
    width: 118,
  },
  buttonCont: {
    paddingVertical: 50,
  },
  inputCont: {
    marginTop: 24,
    alignItems: 'center',
  },
  forgotContainer: {
    marginTop: 12,
    paddingTop: 12,
    alignSelf: 'flex-end',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  socialCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // flex: 1,
    // height: 60,
    marginTop: 40,
    marginBottom: 70,
    width: initialLayout.width * 0.9,
    alignItems: 'center',
  },
  socialIconCont: {
    height: 50,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: colors.iconColor,
    // backgroundColor: colors.colorF72,
  },
  terms: {
    fontSize: 12,
    color: colors.color70,
    fontFamily: 'Livvic',
  },
  header: {
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.color000,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loginWithGoogle: data => dispatch(authAction.loginWithGoogle(data)),
    checkPhone: data => dispatch(authAction.checkPhone(data)),
    getUserDetails: data => dispatch(authAction.getUserDetails(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
