/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Keyboard,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles, {initialLayout} from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {isValidEmail, isValidName} from '../utils';
const ProfileScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [userName, setUserName] = useState(props?.userData?.name || '');
  const [userEmail, setUserEmail] = useState(props?.userData?.email || '');

  const toastRef = useRef(null);
  const emailRef = useRef(null);
  const cancelUpdate = () => setUpdateProfileModal(false);
  const updateInfo = () => {
    Keyboard.dismiss();
    if (!isValidEmail(userEmail)) {
      toastRef?.current.show('Please provide valid email');
    } else if (!isValidName(userName)) {
      toastRef?.current.show('Please provide valid email');
    } else {
      setIsLoading(true);
      let data = new FormData();
      data.append('user_id', props?.userData?.id);
      data.append('name', userName);
      data.append('email', userEmail);
      props
        .updateProfileInfo(data)
        .then(res => {
          console.log(JSON.stringify(res));
          setUpdateProfileModal(false);
        })
        .catch(e => console.log(JSON.stringify(e)))
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#222',
          paddingVertical: 16,
          paddingHorizontal: 12,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.3, alignItems: 'center'}}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: 70, height: 70, borderRadius: 35}}
          />
        </View>
        <View style={{flex: 0.6, alignItems: 'flex-start'}}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontSize: 20, color: '#fff', textAlign: 'left'}}>
            {props?.userData?.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontSize: 16, color: '#fff', textAlign: 'left'}}>
            {props?.userData?.phone || '+91 XXXXXXXXXXX'}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{fontSize: 16, color: '#fff', textAlign: 'left'}}>
            {props?.userData?.email || '***@***.com'}
          </Text>
        </View>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setUpdateProfileModal(true)}
            style={{
              height: 30,
              width: 30,
              backgroundColor: colors.buttonBg,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: '#fff',
              }}
              source={require('../assets/icon/editList.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 22}}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginTop: 22,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 12,
                borderBottomColor: colors.colorECE,
                borderBottomWidth: 0.75,
              }}>
              <Image
                source={require('../assets/icon/user-alt.png')}
                style={{
                  width: 14,
                  height: 14,
                  marginTop: 6,
                  marginEnd: 4,
                  tintColor: colors.colorFC0,
                }}
              />
              <View>
                <Text allowFontScaling={false} style={styles.title}>
                  {'My Account'}
                </Text>
                <Text allowFontScaling={false} style={styles.desc}>
                  Address
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Address', {showHeader: true})
              }
              style={{alignItems: 'flex-end', marginTop: 6}}>
              <Text allowFontScaling={false} style={styles.desc}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginTop: 22,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 12,
                borderBottomColor: colors.colorECE,
                borderBottomWidth: 0.75,
              }}>
              <Image
                source={require('../assets/icon/offer.png')}
                style={{width: 22, height: 19, marginEnd: 4}}
              />
              <View>
                <Text allowFontScaling={false} style={styles.title}>
                  {'My Orders'}
                </Text>
                <Text allowFontScaling={false} style={styles.desc}>
                  watch your all orders
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Orders')}
              style={{alignItems: 'flex-end', marginTop: 6}}>
              <Text allowFontScaling={false} style={styles.desc}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 14,
            marginTop: 22,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 12,
              }}>
              <Image
                resizeMode="center"
                source={require('../assets/icon/unchecked.png')}
                style={{
                  width: 14,
                  height: 14,
                  marginTop: 6,
                  marginEnd: 4,
                  tintColor: colors.colorFC0,
                }}
              />
              <View>
                <Text allowFontScaling={false} style={styles.title}>
                  {'Logout of this app'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 12,
              }}>
              <Image
                resizeMode="center"
                source={require('../assets/icon/unchecked.png')}
                style={{
                  width: 14,
                  height: 14,
                  marginTop: 6,
                  marginEnd: 4,
                  tintColor: colors.colorFC0,
                }}
              />
              <View>
                <Text allowFontScaling={false} style={styles.title}>
                  {'Logout of all devices'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Toast ref={toastRef} position="bottom" />
      <Modal
        onRequestClose={cancelUpdate}
        animationType="slide"
        transparent={true}
        visible={updateProfileModal}>
        <View style={styles.modalBody}>
          <View style={styles.modalCont}>
            <Text allowFontScaling={false} style={styles.title}>
              Update Info
            </Text>
            <View style={{height: 32}} />
            <View style={styles.inputCont}>
              <TextInput
                allowFontScaling={false}
                value={userName}
                returnKeyType="next"
                placeholder="Enter name"
                onSubmitEditing={() => emailRef?.current.focus()}
                keyboardType="default"
                onChangeText={text => setUserName(text)}
                placeholderTextColor={colors.color000}
                style={[CommonStyles.inputContainer, styles.inputContainer]}
              />
            </View>
            <View style={styles.inputCont}>
              <TextInput
                ref={emailRef}
                autoCapitalize="none"
                allowFontScaling={false}
                value={userEmail}
                returnKeyType="done"
                placeholder="Enter email"
                onSubmitEditing={updateInfo}
                keyboardType="email-address"
                onChangeText={text => setUserEmail(text)}
                placeholderTextColor={colors.color000}
                style={[CommonStyles.inputContainer, styles.inputContainer]}
              />
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Pressable
                onPress={cancelUpdate}
                disabled={isLoading}
                style={styles.btnLG}>
                <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={updateInfo}
                disabled={isLoading}
                style={styles.btnLG}>
                <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.colorFC0,
  },
  desc: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.color7B7,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  modalBody: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCont: {
    backgroundColor: colors.colorFFF,
    width: initialLayout.width - 54,
    borderRadius: 6,
    // alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  inputCont: {
    marginBottom: 12,
    alignItems: 'center',
  },
  inputContainer: {
    width: initialLayout.width - 90,
  },
  btnLG: {
    width: initialLayout.width * 0.3,
    height: 44,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    userData: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfileInfo: data => dispatch(appAction.updateProfileInfo(data)),
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
