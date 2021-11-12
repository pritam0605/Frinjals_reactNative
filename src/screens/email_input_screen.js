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
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import {BackgroundPattern} from '../components/background_pattern';
import {color} from 'react-native-reanimated';
const EmailInputScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data] = useState(props.route.params.data);
  const [email, setEmail] = useState('');
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  const submitEmail = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    let fData = new FormData();
    fData.append('email', email);
    fData.append('user_id', data.id);
    props
      .doSubmitEmail(fData)
      .then(res => {
        toastRef.current?.show(res.message, 1000, () => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'dashboard'}],
          });
        });
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
                Enter Email
              </Text>

              <View style={styles.inputCont}>
                <TextInput
                  allowFontScaling={false}
                  value={email}
                  placeholder="Enter email-id"
                  returnKeyType="done"
                  onSubmitEditing={() => submitEmail()}
                  keyboardType="email-address"
                  onChangeText={text => setEmail(text)}
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
                onPress={() => submitEmail()}
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
    doSubmitEmail: fData => dispatch(authAction.doSubmitEmail(fData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmailInputScreen);
