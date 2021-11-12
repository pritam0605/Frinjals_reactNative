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
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-easy-toast';
import colors from '../themes/colors';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const PaymentScreen = ({...props}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 10,
          }}>
          <Text allowFontScaling={false}>Payable Amount</Text>
          <View style={styles.itmPrCnt}>
            <Text allowFontScaling={false}>Price</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: 50,
            borderBottomWidth: 1,
          }}>
          <Pressable
            style={{
              backgroundColor: colors.color000,
              paddingVertical: 4,
              paddingHorizontal: 30,
              borderRadius: 25,
            }}>
            <Text allowFontScaling={false} style={{color: colors.colorFFF}}>
              Apply Coupon
            </Text>
          </Pressable>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text allowFontScaling={false}>Select Payment Method</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              width: initialLayout.width * 0.9,
              paddingVertical: 30,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                width: initialLayout.width * 0.75,
                paddingHorizontal: 8,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: colors.color000,
                marginBottom: 30,
              }}>
              <Text
                allowFontScaling={false}
                style={{color: colors.colorFFF, textAlign: 'center'}}>
                Online ( Debit Card / Credit Card / Net Banking / UPI / Wallet )
              </Text>
            </Pressable>
            <View
              style={{
                height: 54,
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  height: 54,
                  width: initialLayout.width * 0.75,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  backgroundColor: colors.color000,
                }}>
                <Text allowFontScaling={false} style={{color: colors.colorFFF}}>
                  Pay On Delivery
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => props.navigation.navigate('orderConfirmation')}
        style={{
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.color000,
          marginBottom: 1,
        }}>
        <Text allowFontScaling={false} style={styles.title}>
          Continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itmPrCnt: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    color: colors.colorFFF,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
