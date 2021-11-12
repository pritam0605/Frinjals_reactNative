/* eslint-disable react-hooks/exhaustive-deps */
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
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import colors from '../themes/colors';
import CommonStyles, {initialLayout} from '../themes/styles';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
const AllOfferScreen = ({applyCoupon, dismissOfferModal, ...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffer] = useState([]);
  const toastRef = useRef(null);
  React.useEffect(() => {
    getCoupnList();
  }, []);
  const getCoupnList = () => {
    setIsLoading(true);
    let body = new FormData();
    body.append('restaurant_id', props.cartId);
    props
      .getCouponList(body)
      .then(res => setOffer(res))
      .catch(e => toastRef?.current.show(e, 1000))
      .finally(() => setIsLoading(false));
  };
  const handleApply = item => {
    applyCoupon(item);
  };
  const _renderItem = ({item}) => (
    <View style={styles.itemCont}>
      <View style={{flex: 0.7}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/icon/offer.png')}
            style={{width: 22, height: 19, marginEnd: 4}}
          />
          <Text allowFontScaling={false} style={styles.title}>
            {item.name}
          </Text>
        </View>
        <View style={styles.descBox}>
          <View style={{flex: 1, marginTop: 4}}>
            <Text allowFontScaling={false} style={styles.descriptionTxt}>
              {item.type
                ? item.price + ' % off on all items from this restaurant'
                : '₹ ' +
                  item.price +
                  ' off on all cart value from this restaurant'}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.3, alignItems: 'flex-end', paddingHorizontal: 14}}>
        <TouchableOpacity
          onPress={() => applyCoupon(item)}
          style={styles.btnCont}>
          <Text allowFontScaling={false} style={styles.btnText}>
            Apply Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <StatusBar backgroundColor={colors.color000} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => dismissOfferModal()}
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
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.buttonBg} />
          ) : (
            <FlatList
              data={offers}
              renderItem={_renderItem}
              keyExtractor={(item, index) => index + ''}
              contentContainerStyle={{}}
              ListEmptyComponent={() => (
                <Text>
                  Currently this restaurant is not offering any discount coupon.
                </Text>
              )}
            />
          )}
        </View>
        <Toast ref={toastRef} position="bottom" />
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  header: {
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.color000,
  },
  heading: {
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 21,
  },
  button: {
    color: colors.colorFFF,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCont: {
    // borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: colors.colorFFF,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.colorFC0,
  },
  descriptionTxt: {
    fontSize: 14,
    lineHeight: 15,
    color: colors.color242323,
    fontWeight: '300',
  },
  descBox: {},
  btnCont: {
    backgroundColor: colors.buttonBg,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  btnText: {
    fontSize: 16,
    color: colors.colorFFF,
    textAlign: 'center',
  },
});
const mapStateToProps = state => {
  return {
    cartId: state.menuReducer.cartId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCouponList: data => dispatch(appAction.getCouponList(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllOfferScreen);
