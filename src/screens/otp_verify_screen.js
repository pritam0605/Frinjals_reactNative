/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
  Text,
  StatusBar,
  Image,
  Keyboard,
  TextInput,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import RNOtpVerify from 'react-native-otp-verify';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import {BackgroundPattern} from '../components/background_pattern';
const OtpVerifyScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone] = useState(props.route.params.phone);
  const [token] = useState(props.route.params.token);
  const [otp, setOtp] = useState('');
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  React.useEffect(() => {
    RNOtpVerify.getOtp()
      .then(p =>
        RNOtpVerify.addListener(message => {
          console.log('Message: ', JSON.stringify(message));
          try {
            if (message) {
              const OTP = /(\d{4})/g.exec(message);
              // const OTP = message.split(' ')[0];
              if (OTP.length === 4) {
                setOtp(OTP);
                RNOtpVerify.removeListener();
                Keyboard.dismiss();
              }
            }
          } catch (error) {
            console.log('Error: ', error.message);
          }
        }),
      )
      .catch(error => console.log('Error: ', error.message));
    return () => RNOtpVerify.removeListener();
  }, []);
  const submitOtp = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    let data = new FormData();
    data.append('phone_no', phone);
    data.append('phone_otp', otp);
    data.append('token', token);
    props
      .doVerifyOtp(data)
      .then(res => {
        if (res.email) {
          toastRef.current?.show(res.message, 1000, () => {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'dashboard'}],
            });
          });
        } else {
          toastRef.current?.show('Email-Id Required', 1000, () => {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'emailInput', params: {data: res.data}}],
            });
          });
        }
      })
      .catch(e => toastErrorRef.current?.show(e, 1000))
      .finally(() => {
        setIsLoading(false);
      });
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
                Enter OTP
              </Text>

              <View style={styles.inputCont}>
                <TextInput
                  allowFontScaling={false}
                  value={otp}
                  placeholder="Enter OTP..."
                  returnKeyType="done"
                  onSubmitEditing={() => submitOtp()}
                  keyboardType="numeric"
                  onChangeText={text => setOtp(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
            </Pressable>
            {/* <OTPInputView
            style={{width: '100%', height: 100, marginBottom: 50}}
            pinCount={4}
            // code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => {
              setOtp(code);
            }}
            autoFocusOnLoad={true}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              // setOtp(code);
            }}
          /> */}
            <View style={styles.buttonCont}>
              <Pressable
                onPress={() => submitOtp()}
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
            style={{backgroundColor: colors.colorF72}}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: initialLayout.height - 400,
  },
  logo: {
    height: 121,
    width: 118,
  },
  lowerCont: {
    // height: 230,
    flex: 1,
    alignItems: 'center',
  },
  inputCont: {
    marginTop: 12,
    alignItems: 'center',
  },
  buttonCont: {
    paddingVertical: 50,
  },
  inputFieldStyle: {
    fontSize: 16,
    color: colors.color000,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    color: colors.color4F4,
    fontSize: 22,
    borderWidth: 0,
    borderBottomWidth: 3,
    borderColor: colors.color42,
  },
  underlineStyleHighLighted: {
    borderColor: colors.colorB9F729,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doVerifyOtp: data => dispatch(authAction.doVerifyOtp(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OtpVerifyScreen);
