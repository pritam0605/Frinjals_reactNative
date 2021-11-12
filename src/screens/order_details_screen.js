/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
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
import RadioGroup, {RadioButton} from 'react-native-radio-buttons-group';
import Toast from 'react-native-easy-toast';
import colors from '../themes/colors';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
import CommonStyles from '../themes/styles';
import Header from '../components/header';
import moment from 'moment';

const OrderDetailsScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [order] = useState(props.route.params.item);
  const toastRef = useRef(null);
  useEffect(() => {
    // console.log(JSON.stringify(order));
  }, [order]);
  const _renderItem = ({item}) => (
    <View style={styles.itmCont}>
      <View style={{flex: 0.4, alignItems: 'flex-start'}}>
        <FastImage source={{uri: item.icon}} style={styles.avatar} />
      </View>
      <View style={{flex: 0.6, justifyContent: 'space-between'}}>
        <View style={styles.itmInfoCnt}>
          <View style={{flex: 1}}>
            <Text allowFontScaling={false} style={styles.itemName}>
              {item?.name}
            </Text>
          </View>
        </View>
        <View style={styles.itmInfoCnt}>
          <View style={styles.desc}>
            <Text numberOfLines={2} allowFontScaling={false}>
              {item?.description}
            </Text>
          </View>
        </View>
        <View style={styles.itmInfoCnt}>
          <View
            style={{
              height: 23,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.colorff6d6f,
            }}>
            <View style={{paddingHorizontal: 6}}>
              {/* <Image
                source={require('../assets/icon/minus.png')}
                style={styles.iconPM}
              /> */}
            </View>
            <View style={{paddingHorizontal: 6}}>
              <Text
                allowFontScaling={false}
                style={{fontSize: 12, color: colors.colorFFF}}>
                {item.pivot.qty}
              </Text>
            </View>
            <View style={{paddingHorizontal: 6}}>
              {/* <Image
                source={require('../assets/icon/plus.png')}
                style={styles.iconPM}
              /> */}
            </View>
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.amount}>
              {'₹ ' + item?.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  const _renderFooter = () => (
    <View style={{marginBottom: 40, marginTop: 20}}>
      <View>
        <Text allowFontScaling={false} style={styles.titleO}>
          Order ID:
        </Text>

        <View style={styles.idCnt}>
          <Text allowFontScaling={false} style={{fontSize: 15}}>
            {order?.id}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 22,
          marginBottom: 12,
        }}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '400',
              textTransform: 'uppercase',
              color: colors.color61,
            }}>
            Price Details
          </Text>
        </View>
      </View>
      <View style={styles.itmInfoCnt}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            Price({order?.items.length} items)
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            {'₹ ' + order?.order_price}
          </Text>
        </View>
      </View>
      {/* <View style={styles.itmInfoCnt}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            Discount
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.colorFC0,
            }}>
            -Rs. 459/-
          </Text>
        </View>
      </View>
      <View style={styles.itmInfoCnt}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            Delivery charges
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            Rs. 55/-
          </Text>
        </View>
      </View> */}
      <View style={[CommonStyles.hr, {marginVertical: 12}]} />
      <View style={styles.itmInfoCnt}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            TOTAL AMOUNT
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.color1e,
            }}>
            {'₹ ' + order?.order_price}
          </Text>
        </View>
      </View>
      {/* <View style={styles.itmInfoCnt}>
        <View style={{flex: 1}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              fontWeight: '600',
              textTransform: 'uppercase',
              color: colors.colorFC0,
            }}>
            You will Save rs. 555/- on this order
          </Text>
        </View>
      </View> */}
      <View style={[CommonStyles.hr, {marginVertical: 22}]} />
      {order?.comment.trim() !== '' && (
        <View style={{marginTop: 12}}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              color: colors.color242323,
              fontWeight: '400',
            }}>
            Cooking related note :
          </Text>
          <View style={{marginVertical: 18}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 13,
                fontWeight: '300',
                color: colors.color242323,
                lineHeight: 19,
              }}>
              {order?.comment}
            </Text>
          </View>
        </View>
      )}
      <View style={{marginVertical: 24}}>
        <Text
          allowFontScaling={false}
          style={{fontSize: 16, color: colors.color242323, fontWeight: '400'}}>
          Schedule
        </Text>
        <View
          style={{
            marginVertical: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: colors.colorFC0,
            }}>
            Date:{' '}
            <Text allowFontScaling={false} style={{color: colors.color242323}}>
              {moment(order?.created_at).format('DD MMM`YY')}
            </Text>
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: colors.colorFC0,
            }}>
            Time:{' '}
            <Text allowFontScaling={false} style={{color: colors.color242323}}>
              {moment(order?.created_at).format('hh:mm a')}
            </Text>
          </Text>
        </View>
      </View>

      {order.last_status[0].alias !== 'delivered' && (
        <View style={styles.buttonCont}>
          <Pressable
            onPress={() => props.navigation.navigate('orderStatus', {order})}
            style={CommonStyles.btnLG}>
            <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
              Track Order
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => props.navigation.pop()}
          style={styles.header}>
          <Image
            source={require('../assets/icon/back.png')}
            style={{
              marginHorizontal: 16,
              width: 20,
              height: 20,
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={order?.items}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index + ''}
            style={{paddingHorizontal: 8}}
            contentContainerStyle={{}}
            ListFooterComponent={_renderFooter}
          />
        </View>
        <Toast ref={toastRef} position="bottom" />
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.color000,
  },
  headCont: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.color000,
  },
  title: {
    color: colors.colorFFF,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleO: {
    color: colors.color000,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
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
  addCont: {
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
  btnChg: {},
  chgBtnTxt: {
    color: colors.colorFFF,
  },
  buttonCont: {
    paddingVertical: 25,
  },
  itmCont: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.colorECE,
    elevation: 1,
    padding: 18,
    backgroundColor: colors.colorFFF,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.color000,
  },
  itmInfoCnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itmPrCnt: {},
  itemName: {
    fontSize: 16,
    color: colors.color242323,
  },
  desc: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '300',
    color: colors.color61,
  },
  amount: {
    fontSize: 13,
    color: colors.color242323,
    fontWeight: '400',
  },
  iconPM: {
    width: 15,
    height: 15,
    tintColor: colors.colorFFF,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen);
