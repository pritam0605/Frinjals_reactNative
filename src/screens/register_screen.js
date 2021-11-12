/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Image,
  TextInput,
  Keyboard,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {BackgroundPattern} from '../components/background_pattern';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import {authAction} from '../store/actions/authActions';
import colors from '../themes/colors';
import CommonStyles, {initialLayout} from '../themes/styles';
import {isValidEmail, isValidMobile, isValidName} from '../utils';
const RegisterScreen = ({...props}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(props.route.params?.phone || null);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const doRegister = () => {
    if (!isValidName(name)) {
      toastRef.current?.show('Invalid name input', 1000);
    } else if (!isValidEmail(email)) {
      toastRef.current?.show('Invalid email input', 1000);
    } else if (!isValidMobile(phone)) {
      toastRef.current?.show('Invalid mobile number', 1000);
    } else {
      setIsLoading(true);
      let data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('phone', phone);
      data.append('app_secret', 'frinjal');
      props
        .doRegister(data)
        .then(({phone, otp_time, otp, token}) => {
          toastRef.current?.show('SMS sent successfully.', 1000, () => {
            props.navigation.navigate('otpverify', {
              phone,
              otp_time,
              otp,
              token,
            });
          });
        })
        .catch(e => toastErrorRef.current?.show(e, 1000))
        .finally(() => setIsLoading(false));
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
                Sign Up
              </Text>
              <View style={styles.inputCont}>
                <TextInput
                  ref={nameRef}
                  allowFontScaling={false}
                  value={name}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="default"
                  placeholder="Enter Your Name"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  onChangeText={text => setName(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <TextInput
                  ref={emailRef}
                  allowFontScaling={false}
                  value={email}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="email-address"
                  placeholder="Enter Your Email"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  onChangeText={text => setEmail(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <TextInput
                  ref={phoneRef}
                  allowFontScaling={false}
                  value={phone}
                  textContentType="telephoneNumber"
                  autoCapitalize="none"
                  returnKeyType="done"
                  keyboardType="phone-pad"
                  placeholder="Enter Your Mobile No."
                  onSubmitEditing={() => doRegister()}
                  onChangeText={text => setPhone(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
              <View>
                <Text allowFontScaling={false} style={styles.terms}>
                  I agree to "Terms & Conditions" and "Privacy policy" of
                  Frinjal's Hub mobile app and website.
                </Text>
              </View>
            </Pressable>

            <View style={styles.buttonCont}>
              <Pressable
                onPress={() => doRegister()}
                disabled={isLoading}
                style={CommonStyles.btnLG}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.colorFFF} />
                ) : (
                  <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                    Submit
                  </Text>
                )}
              </Pressable>
            </View>
            <View style={styles.buttonCont}>
              <Pressable
                onPress={() => props.navigation.goBack()}
                disabled={isLoading}
                style={{alignSelf: 'center'}}>
                <Text>Back to Login</Text>
              </Pressable>
            </View>
          </View>
          <Toast ref={toastRef} position="bottom" />
          <Toast
            ref={toastErrorRef}
            position="bottom"
            style={{backgroundColor: colors.color000}}
          />
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
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: initialLayout.height - 400,
  },
  lowerCont: {
    // height: 230,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  margin: {
    height: 30,
  },
  logo: {
    height: 121,
    width: 118,
  },
  buttonCont: {
    paddingVertical: 25,
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
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doRegister: data => dispatch(authAction.doRegister(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
