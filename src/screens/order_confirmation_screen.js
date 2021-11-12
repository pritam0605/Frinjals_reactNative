/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-easy-toast';
import colors from '../themes/colors';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import CommonStyles, {initialLayout} from '../themes/styles';
import Header from '../components/header';
import {BackgroundPattern} from '../components/background_pattern';

const OrderConfirmationScreen = ({...props}) => {
  const [orderId] = useState(props.route.params.id);
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            props.navigation.reset({
              index: 0,
              routes: [{name: 'dashboard'}],
            })
          }
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
        <View style={styles.container}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image
              source={require('../assets/icon/checkmark.png')}
              style={{height: 60, width: 60, marginBottom: 16}}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 24,
                fontWeight: '400',
                color: colors.colorFC0,
              }}>
              Order Placed Successfully
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text allowFontScaling={false} style={styles.title}>
              Order ID:
            </Text>

            <View style={styles.idCnt}>
              <Text allowFontScaling={false} style={{fontSize: 15}}>
                {orderId}
              </Text>
            </View>
            <View
              style={{
                width: 200,
                marginVertical: 20,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                allowFontScaling={false}
                style={[styles.title, {textAlign: 'center'}]}>
                Your food is being prepared
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 24,
                color: colors.colorFC0,
                textAlign: 'center',
              }}>
              Thank You!
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 0.9,
              paddingBottom: 12,
            }}>
            <Pressable style={CommonStyles.btnLG}>
              <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                Download Invoice
              </Text>
            </Pressable>
            <Pressable
              style={CommonStyles.btnLG}
              onPress={() => props.navigation.navigate('trackorder')}>
              <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                Track your FooD
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.color000,
  },
  idCnt: {
    height: 44,
    flexDirection: 'row',
    borderColor: colors.colorECE,
    backgroundColor: colors.colorFFF,
    borderWidth: 1,
    borderRadius: 5,
    // paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.color000,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderConfirmationScreen);
