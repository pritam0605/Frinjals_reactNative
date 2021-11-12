/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import colors from '../themes/colors';
import {APP_VERSION} from '../constants';
import CommonStyles from '../themes/styles';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';

const CustomSideBarMenu = ({...props}) => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const doLogout = async () => {
    await GoogleSignin.signOut();
    props.doLogout().then(() =>
      props.navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      }),
    );
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <ScrollView style={{}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 18,
              backgroundColor: colors.color323030,
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                marginEnd: 12,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: colors.colorff6d6f,
              }}>
              <Image
                source={require('../assets/icon/user.png')}
                style={{width: 30, height: 30}}
              />
            </View>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{fontSize: 19, color: colors.colorFFF}}>
                {props.userData?.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={styles.customItem1}>
            <Image
              source={require('../assets/icon/home.png')}
              style={styles.iconH}
            />
            <Text style={styles.menuLabel1}>Home</Text>
          </TouchableOpacity>
          <View style={styles.menuLine} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Orders')}
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/offer.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>My Orders</Text>
          </TouchableOpacity>
          <View style={styles.menuLine} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/user-alt.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.menuLine} />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Address', {showHeader: true})
            }
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/location-pin.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>Delivery Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ContactUs')}
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/headphones.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>Contact Us</Text>
          </TouchableOpacity>
          <View style={styles.menuLine} />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Terms')}
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/sticky-note.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>Terms & Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Privacy')}
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/phonelink.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={styles.menuLine} />
          <TouchableOpacity
            onPress={() => doLogout()}
            style={styles.customItem2}>
            <Image
              source={require('../assets/icon/unchecked.png')}
              style={styles.icon}
            />
            <Text style={styles.menuLabel}>Log Out</Text>
          </TouchableOpacity>
          <View style={styles.menuLine} />
          <View style={styles.customItem2}>
            <Text style={styles.menuLableRight}>V {APP_VERSION}</Text>
          </View>
        </ScrollView>
        {/* <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Pressable
            onPress={() => props.navigation.pop()}
            style={styles.btnLG}>
            <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
              Track ordEr
            </Text>
          </Pressable>
        </View> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: 120,
    //top: (Platform.OS) === 'ios' ? 10 : 20,
    paddingLeft: 30,
    paddingRight: 25,
    marginTop: 20,
    //marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconH: {
    width: 24,
    height: 22,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: colors.colorFFF,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: colors.color000,
  },
  customItem1: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.color000,
    height: 56,
  },
  customItem2: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // justifyContent: 'space-between',
    height: 56,
  },
  profileHeaderText: {
    color: '#222222',
    alignSelf: 'center',
    fontSize: 20,
    //textAlign: 'left',
    marginLeft: 15,
    marginRight: 3,
    width: '72%',
  },
  menuLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  menuLabel1: {
    fontWeight: '400',
    fontSize: 24,
    color: colors.colorFFF,
  },
  menuLabel: {
    fontWeight: '400',
    fontSize: 16,
  },
  menuLableLight: {
    alignItems: 'flex-start',
    color: '#999999',
    fontSize: 16,
  },
  menuLableRight: {
    paddingLeft: 25,
    //alignItems: 'flex-end',
    fontSize: 15,
  },

  btnLG: {
    height: 54,
    width: 239,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  buttonCont: {
    // alignSelf: 'center',
    // height: 59,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    // borderRadius: 15,
    // width: initialLayout.width * 0.5 - 44,
    // paddingVertical: 50,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomSideBarMenu);
