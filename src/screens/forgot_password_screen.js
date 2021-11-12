/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import {authAction} from '../store/actions/authActions';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import {isValidEmail} from '../utils';
const ForgotPasswordScreen = ({...props}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);

  const doForgot = () => {
    if (!isValidEmail(email)) {
      toastRef.current?.show('Invalid email input', 1000);
    } else {
      setIsLoading(true);
      let data = {
        username: email,
      };
      props
        .doForgot(data)
        .then(res => toastRef.current?.show(res, 1000))
        .catch(e => toastErrorRef.current?.show(e, 1000))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <KeyboardAwareView>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.container}>
          <View style={{marginTop: 16}}>
            <Pressable
              style={CommonStyles.backBtnCnt}
              onPress={() => props.navigation.pop()}>
              <Image
                source={require('../assets/icon/back.png')}
                style={{width: 10, height: 20, tintColor: '#fff'}}
              />
            </Pressable>
          </View>
          <View style={{flex: 0.5}} />
          <View style={styles.logoCont}>
            <View style={styles.labelCont}>
              <Text allowFontScaling={false} style={styles.label}>
                Don't worry, just enter the email used while sign-up:
              </Text>
            </View>
            <View style={CommonStyles.inputContainer}>
              <TextInput
                allowFontScaling={false}
                style={[{flex: 1, color: colors.color000, height: '100%'}]}
                value={email}
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => doForgot()}
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
              />
            </View>
          </View>
          <View style={{flex: 0.5}} />
          <View style={styles.buttonCont}>
            <Pressable
              disabled={isLoading}
              style={[CommonStyles.btnLG, {backgroundColor: colors.color23}]}
              onPress={() => doForgot()}>
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.colorF72} />
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
          style={{backgroundColor: colors.colorF72}}
        />
      </SafeAreaView>
    </KeyboardAwareView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logoCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: initialLayout.height - 300,
  },
  lowerCont: {
    height: 250,
  },
  margin: {
    height: 30,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  buttonCont: {
    paddingTop: 95,
    paddingBottom: 25,
    flexDirection: 'column',
  },
  inputCont: {
    marginTop: 24,
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
  labelCont: {
    paddingHorizontal: 26,
  },
  label: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
    color: colors.color42,
  },
  textButton: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
    color: colors.colorF72,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doForgot: data => dispatch(authAction.doForgot(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
