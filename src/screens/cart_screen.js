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
  Modal,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import RadioGroup from 'react-native-radio-buttons-group';
import Toast from 'react-native-easy-toast';
import colors from '../themes/colors';
import {connect} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import {appAction} from '../store/actions/appActions';
import {
  emptyCart,
  increaseToCart,
  removeItem,
  subToCart,
} from '../store/actions/cartAction';
import {BackgroundPattern} from '../components/background_pattern';
import CommonStyles from '../themes/styles';
import AllOfferScreen from './all_offer_screen';
import {RazorPay} from '../constants';
const radioButtonsData = [
  {
    id: '1',
    label: 'Online Payment',
    value: 'online',
    selected: false,
  },
  // {
  //   id: '2',
  //   label: 'Net Banking',
  //   value: 'netbank',
  //   selected: false,
  // },
  // {
  //   id: '3',
  //   label: 'UPI / Wallet',
  //   value: 'upi',
  //   selected: false,
  // },
  {
    id: '4',
    label: 'Cash on Delivery/ Pay on Restaurant',
    value: 'cod',
    selected: false,
  },
  // {
  //   id: '5',
  //   label: 'Pay On Restaurant',
  //   value: 'porestaurant',
  //   selected: false,
  // },
];

const CartScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [couponModal, setCouponModal] = useState(false);
  const [discountOffer, setDiscountOffer] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const toastRef = useRef(null);
  // const cartData = useSelector(menuItem, shallowEqual);
  const dismissOfferModal = () => setCouponModal(false);
  const applyCoupon = data => {
    setDiscountOffer(data);
    setCouponModal(false);
  };
  const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
  };
  const _processOrder = () => {
    const selectedPayment = radioButtons.find(m => m.selected);
    if (props?.orderType === 'delivery' && props?.address === null) {
      toastRef?.current.show('Please select delivery address');
    } else if (selectedPayment === undefined) {
      toastRef?.current.show('Please select any payment method');
    } else {
      _calculatePayment().then(res => {
        if (selectedPayment.value === 'cod') {
          _generateOrder('cod', null, res);
        } else {
          var options = {
            description: 'Payment towards Food Order',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: RazorPay.id,
            amount: res * 100,
            name: 'Frinjal',
            // order_id: 'order_DslnoIgkIDL8Zt', //Replace this with an order_id created using Orders API.
            prefill: {
              email: props.userData.email,
              contact: props.userData.phone,
              name: props.userData.name,
            },
            theme: {color: colors.buttonBg},
          };
          RazorpayCheckout.open(options)
            .then(data => {
              // handle success
              _generateOrder('online', data.razorpay_payment_id, res);
            })
            .catch(
              error => console.log('Error Occured: ', error),
              // toastRef?.current.show(error.error.description, 1000),
            );
        }
      });
    }
    // props.navigation.navigate('orderConfirmation');
  };
  const _generateOrder = (payment_method, stripe_token, amount) => {
    setIsLoading(true);
    let orderData = {
      vendor_id: props?.vendor.id,
      delivery_method: props.orderType,
      payment_method,
      address_id: payment_method === 'delivery' ? props?.address.id : 1,
      items: props?.cartItem.map(({id, qty}) => ({
        id,
        qty,
        extrasSelected: [],
        variant: 1,
      })),
      comment: orderNote,
      timeslot: '0_0',
      stripe_token,
      // discountOffer,
      // paidAmount: amount,
      // totalPayment: props.cartItem
      //   .reduce((sum, current) => {
      //     return sum + current.qty * current.price;
      //   }, 0)
      //   .toFixed(2),
    };
    props
      .createOrder(JSON.stringify(orderData))
      .then(res => {
        if (res.status) {
          props.clearCart();
          toastRef?.current.show(res.message, 1000);
          props.navigation.navigate('orderConfirmation', {id: res.id});
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      })
      .finally(() => setIsLoading(false));
  };
  const _calculatePayment = () => {
    return new Promise((resolve, reject) => {
      var totalPayment = props.cartItem
        .reduce((sum, current) => {
          return sum + current.qty * current.price;
        }, 0)
        .toFixed(2);
      var discountAmount = 0;
      if (discountOffer !== null) {
        discountAmount = discountOffer.type
          ? props.cartItem
              .reduce((sum, current) => {
                return (
                  sum +
                  current.qty * ((discountOffer.price / 100) * current.price)
                );
              }, 0)
              .toFixed(2)
          : discountOffer.price;
      }
      var finalAmount = (totalPayment - discountAmount).toFixed(2);
      resolve(finalAmount);
    });
  };
  const removeItem = item => {
    item.qty = 0;
    props.removeItem(item);
  };
  const increaseQty = async item => {
    await setIsAdding(true);
    ++item.qty;
    await setIsAdding(false);
  };
  const decreaseQty = async item => {
    await setIsAdding(true);
    if (item.qty === 1) {
      props.removeItem(item);
    }
    --item.qty;
    await setIsAdding(false);
  };
  const _renderItem = ({item}) => (
    <View style={styles.itmCont}>
      <View style={{flex: 0.4, alignItems: 'flex-start'}}>
        <FastImage source={{uri: item.icon}} style={styles.avatar} />
      </View>
      <View style={{flex: 0.6, justifyContent: 'space-between'}}>
        <View style={styles.itmInfoCnt}>
          <View style={{flex: 1}}>
            <Text allowFontScaling={false} style={styles.itemName}>
              {item.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => removeItem(item)}
            style={styles.itmPrCnt}>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              source={require('../assets/icon/deleteList.png')}
              style={{width: 15, height: 15, tintColor: colors.color000}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itmInfoCnt}>
          <View style={styles.desc}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              allowFontScaling={false}>
              {item.description}
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
            <TouchableOpacity
              onPress={() => decreaseQty(item)}
              disabled={isAdding}
              style={{paddingHorizontal: 6}}>
              <Image
                source={require('../assets/icon/minus.png')}
                style={styles.iconPM}
              />
            </TouchableOpacity>
            <View style={{paddingHorizontal: 6}}>
              <Text
                allowFontScaling={false}
                style={{fontSize: 12, color: colors.colorFFF}}>
                {item.qty}
              </Text>
            </View>
            <TouchableOpacity
              disabled={isAdding}
              onPress={() => increaseQty(item)}
              style={{paddingHorizontal: 6}}>
              <Image
                source={require('../assets/icon/plus.png')}
                style={styles.iconPM}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.amount}>
              {'₹' + item.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  const _renderFooter = () => (
    <View style={{marginBottom: 40, marginTop: 20}}>
      <TouchableOpacity
        onPress={() =>
          discountOffer === null ? setCouponModal(true) : setDiscountOffer(null)
        }
        style={styles.addCont}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/icon/discount.png')}
            resizeMode="contain"
            style={{height: 15, width: 15, marginTop: 3, marginEnd: 18}}
          />

          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: colors.color000,
            }}>
            {discountOffer === null ? 'Apply Item Coupon' : discountOffer.name}
          </Text>
        </View>
        <View style={styles.btnChg}>
          {discountOffer === null ? (
            <Image
              source={require('../assets/icon/back.png')}
              style={{height: 16, width: 14, transform: [{rotate: '180deg'}]}}
            />
          ) : (
            <Image
              source={require('../assets/icon/close.png')}
              style={{height: 16, width: 14, tintColor: colors.color000}}
            />
          )}
        </View>
      </TouchableOpacity>
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
            Price(
            {props.cartItem.length > 1
              ? props.cartItem.length + ' items'
              : props.cartItem.length + ' item'}
            )
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
            {'₹ ' +
              props.cartItem
                .reduce((sum, current) => {
                  return sum + current.qty * current.price;
                }, 0)
                .toFixed(2)}
          </Text>
        </View>
      </View>
      {discountOffer !== null && (
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
              {discountOffer.type
                ? '-₹ ' +
                  props.cartItem
                    .reduce((sum, current) => {
                      return (
                        sum +
                        current.qty *
                          ((discountOffer.price / 100) * current.price)
                      );
                    }, 0)
                    .toFixed(2)
                : '-₹ ' + discountOffer.price}
            </Text>
          </View>
        </View>
      )}
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
            {'₹ 55/-'}
          </Text>
        </View>
      </View>
      <View style={[CommonStyles.hr, {marginVertical: 12}]} />
      <View style={{marginTop: 12}}>
        <Text
          allowFontScaling={false}
          style={{fontSize: 16, color: colors.color242323, fontWeight: '400'}}>
          Cooking related note :
        </Text>
        <View style={{marginVertical: 18}}>
          <OrderNoteInput
            value={orderNote}
            onChange={value => setOrderNote(value)}
          />
        </View>
      </View>
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
              {moment().format('DD/MM/YY')}
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
              {moment().format('hh:mm a')}
            </Text>
          </Text>
        </View>
      </View>
      <View style={CommonStyles.hr} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 28,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/icon/discount.png')}
            resizeMode="contain"
            style={{height: 15, width: 15, marginEnd: 1}}
          />

          <Text
            allowFontScaling={false}
            style={{
              fontSize: 11,
              fontWeight: '400',
              color: colors.color323030,
            }}>
            5% Unlimited Cashback on Bank credit card
          </Text>
        </View>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 11,
            fontWeight: '400',
            color: colors.color323030,
          }}>
          T & C
        </Text>
      </View>
      <Text allowFontScaling={false} style={{fontSize: 16, fontWeight: '400'}}>
        Select Payment Method:
      </Text>
      <View
        style={{
          alignItems: 'flex-start',
          paddingStart: 28,
          paddingTop: 24,
        }}>
        <RadioGroup
          containerStyle={{alignItems: 'flex-start'}}
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
      </View>

      <View />
      <View style={styles.buttonCont}>
        <Pressable
          disabled={isLoading}
          onPress={_processOrder}
          style={CommonStyles.btnLG}>
          <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
            Continue
          </Text>
        </Pressable>
      </View>
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
          <Spinner visible={isLoading} textStyle={styles.spinnerTextStyle} />
          {props.cartItem.length > 0 ? (
            <>
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  marginBottom: 24,
                }}>
                <View style={{marginBottom: 14}}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 24,
                      fontWeight: '400',
                      color: colors.colorFC0,
                    }}>
                    {props?.orderType === 'delivery'
                      ? 'Delivery Location'
                      : 'Restaurant Location'}
                    :
                  </Text>
                </View>
                {props?.orderType === 'delivery' ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      props.navigation.navigate('myaddresslist', {
                        showHeader: false,
                      })
                    }
                    style={styles.addCont}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: colors.color000,
                      }}>
                      {props?.address !== null
                        ? props?.address.address
                        : 'Choose address'}
                    </Text>
                    <View style={styles.btnChg}>
                      <Image
                        source={require('../assets/icon/back.png')}
                        style={{
                          height: 16,
                          width: 14,
                          transform: [{rotate: '-90deg'}],
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.addCont}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color: colors.color000,
                      }}>
                      {props?.vendor.address}
                    </Text>
                  </View>
                )}
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={props.cartItem}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index + ''}
                style={{paddingHorizontal: 8}}
                contentContainerStyle={{}}
                ListFooterComponent={_renderFooter}
              />
            </>
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Pressable
                onPress={() => props.navigation.goBack()}
                style={CommonStyles.btnSM}>
                <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                  Add Item
                </Text>
              </Pressable>
            </View>
          )}
        </View>
        <Toast ref={toastRef} position="bottom" />
        <Modal visible={couponModal}>
          <AllOfferScreen
            dismissOfferModal={dismissOfferModal}
            applyCoupon={applyCoupon}
          />
        </Modal>
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const OrderNoteInput = ({value, onChange}) => {
  const [currentValue, setCurrentValue] = useState(`${value}`);
  return (
    <TextInput
      allowFontScaling={false}
      multiline
      value={currentValue}
      placeholder="Please type your message will pass to the Chief"
      placeholderTextColor={colors.color242323}
      numberOfLines={5}
      onChangeText={v => setCurrentValue(v)}
      onEndEditing={() => onChange(currentValue)}
      style={{
        textAlignVertical: 'top',
        fontSize: 13,
        fontWeight: '300',
        color: colors.color242323,
        lineHeight: 19,
        borderWidth: 0.55,
        borderColor: colors.color000,
        borderRadius: 4,
      }}
    />
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
  return {
    userData: state.authReducer.user,
    cartItem: state.menuReducer.cartItem,
    orderType: state.common.orderType,
    vendor: state.common.vendor,
    address: state.common.address,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(emptyCart()),
    removeItem: item => dispatch(removeItem(item)),
    increaseQty: item => dispatch(increaseToCart(item)),
    decreaseQty: item => dispatch(subToCart(item)),
    createOrder: data => dispatch(appAction.createOrder(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
