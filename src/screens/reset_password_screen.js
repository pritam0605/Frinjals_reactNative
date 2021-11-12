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
} from 'react-native';
import {isPasswordLen, isValidPassCPass} from '../utils/index';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';

const ResetPasswordScreen = ({...props}) => {
  const [confirmP, setConfirmP] = useState('');
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState(props.route.params.hash);
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureC, setIsSecureC] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  const passRef = useRef(null);
  const passCRef = useRef(null);

  React.useEffect(() => {
    const doValidateHash = () => {
      props
        .doValidateHash({hash})
        .then(() => {})
        .catch(e => {
          toastErrorRef.current?.show(e, 1000, () => {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'landing'}],
            });
          });
        });
    };
    doValidateHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  const doResetPassword = () => {
    if (!isPasswordLen(password)) {
      toastErrorRef.current?.show('Invalid password input', 1000);
    } else if (!isValidPassCPass(password, confirmP)) {
      toastErrorRef.current?.show(
        'Password and Confirm password not matching',
        1000,
      );
    } else {
      setIsLoading(true);
      let data = {
        hash,
        password,
      };
      props
        .doResetPassword(data)
        .then(res => {
          toastRef.current?.show(res, 1000, () => {
            resetToHome();
          });
        })
        .catch(e => toastErrorRef.current?.show(e, 1000))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const resetToHome = () => {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'landing'}],
    });
  };

  return (
    <KeyboardAwareView>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.container}>
          <View style={{marginTop: 16}}>
            <Pressable
              style={CommonStyles.backBtnCnt}
              onPress={() => resetToHome()}>
              <Image
                source={require('../assets/icon/back.png')}
                style={{width: 10, height: 20, tintColor: '#fff'}}
              />
            </Pressable>
          </View>

          <View style={styles.logoCont}>
            <Image
              source={{uri: 'https://picsum.photos/300'}}
              style={styles.logo}
              resizeMode="center"
              resizeMethode="resize"
            />
          </View>
          <Pressable
            onPress={() => Keyboard.dismiss()}
            style={styles.lowerCont}>
            <Text allowFontScaling={false} style={CommonStyles.heading}>
              Reset Password!
            </Text>
            <View style={{height: 12}} />

            <View style={styles.inputCont}>
              <Text allowFontScaling={false} style={CommonStyles.inputLabel}>
                Password
              </Text>
              <View
                style={[
                  CommonStyles.inputContainer,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  allowFontScaling={false}
                  ref={passRef}
                  value={password}
                  placeholder="Minimum 6 character"
                  textContentType="newPassword"
                  secureTextEntry={isSecure}
                  returnKeyType="next"
                  onSubmitEditing={() => passCRef.current?.focus()}
                  keyboardType="default"
                  onChangeText={text => setPassword(text)}
                  placeholderTextColor={colors.color000}
                  style={{flex: 1, marginEnd: 10}}
                />
                <Pressable
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={{}}
                  onPress={() => setIsSecure(!isSecure)}>
                  {isSecure ? (
                    <Image
                      source={require('../assets/icon/show-pass.png')}
                      style={styles.inputIcon}
                    />
                  ) : (
                    <Image
                      source={require('../assets/icon/hide-pass.png')}
                      style={styles.inputIcon}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.inputCont}>
              <Text allowFontScaling={false} style={CommonStyles.inputLabel}>
                Confirm Password
              </Text>
              <View
                style={[
                  CommonStyles.inputContainer,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  allowFontScaling={false}
                  ref={passCRef}
                  placeholder="Minimum 6 character"
                  value={confirmP}
                  secureTextEntry={isSecureC}
                  textContentType="password"
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={() => doResetPassword()}
                  onChangeText={text => setConfirmP(text)}
                  placeholderTextColor={colors.color000}
                  style={{flex: 1, marginEnd: 10}}
                />
                <Pressable
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={{}}
                  onPress={() => setIsSecureC(!isSecureC)}>
                  {isSecureC ? (
                    <Image
                      source={require('../assets/icon/show-pass.png')}
                      style={styles.inputIcon}
                    />
                  ) : (
                    <Image
                      source={require('../assets/icon/hide-pass.png')}
                      style={styles.inputIcon}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </Pressable>
          <View style={styles.buttonCont}>
            <Pressable
              onPress={() => doResetPassword()}
              disabled={isLoading}
              style={[CommonStyles.btnLG, {backgroundColor: colors.color23}]}>
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
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doValidateHash: data => dispatch(authAction.doValidateHash(data)),
    doResetPassword: data => dispatch(authAction.doResetPassword(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordScreen);
