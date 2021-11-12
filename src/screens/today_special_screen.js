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
  Alert,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-easy-toast';
import colors from '../themes/colors';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
import CommonStyles, {initialLayout} from '../themes/styles';
import Header from '../components/header';
import {
  addToCart,
  emptyCart,
  increaseToCart,
  removeItem,
  subToCart,
} from '../store/actions/cartAction';

const TodaySpecialScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [vendorId] = useState('special');
  const [special, setSpecial] = useState([]);
  const toastRef = useRef(null);
  React.useEffect(() => {
    props.getTodaySpecialList().catch(e => toastRef?.current.show(e, 1000));
  }, []);
  const addToCart = item => {
    if (
      props.cartId == null ||
      props.cartItem.length === 0 ||
      props.cartId === vendorId
    ) {
      setIsAdding(true);
      props.addToCart(item, vendorId);
      var temp = Object.assign([], props.menuItems);
      var find = temp.find(i => i.id === item.id);
      find.qty = 1;
      setSpecial([]);
      setIsAdding(false);
    } else {
      Alert.alert(
        'Warning',
        'Your cart is having items from different restaurant. Are you sure to choose this, it will clear you cart',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Continue',
            onPress: () => {
              props.clearCart();
              setIsAdding(true);
              props.addToCart(item, vendorId);
              var temp = Object.assign([], props.menuItems);
              var find = temp.find(i => i.id === item.id);
              find.qty = 1;
              setSpecial([]);
              setIsAdding(false);
            },
          },
        ],
      );
    }
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
    <View style={styles.itemCont}>
      <View style={{flex: 0.5, justifyContent: 'space-between'}}>
        <Text allowFontScaling={false} style={styles.title}>
          {item.name}
        </Text>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          allowFontScaling={false}
          style={styles.desc}>
          {item.description}
        </Text>
        {/* <Text allowFontScaling={false} style={styles.price}>
          Price: {'Rs. 99.00'}
        </Text> */}
        <Text allowFontScaling={false} style={styles.offerPrice}>
          {'₹' + item.price}
        </Text>
      </View>
      <View style={{flex: 0.5, alignItems: 'flex-end'}}>
        <FastImage
          resizeMode="cover"
          source={{uri: item.image}}
          style={{height: 113, width: 130, borderRadius: 6}}
        />
        {item.qty === 0 ? (
          <TouchableOpacity
            disabled={isAdding}
            onPress={() => addToCart(item)}
            style={{
              height: 23,
              width: 88,
              // flex: 1,
              alignItems: 'center',
              backgroundColor: colors.colorff6d6f,
              borderRadius: 5,
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginTop: 6,
            }}>
            <Text allowFontScaling={false} style={styles.buttonTxt}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              height: 23,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.colorff6d6f,
              marginTop: 6,
            }}>
            <TouchableOpacity
              disabled={isAdding}
              onPress={() => decreaseQty(item)}
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
        )}
      </View>
    </View>
  );
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <Header willBack={true} {...props} />
        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.heading}>
            Today's Special
          </Text>
          <View style={{flex: 1}}>
            <FlatList
              data={props.menuItems}
              renderItem={_renderItem}
              keyExtractor={(item, index) => index + ''}
              style={{}}
              contentContainerStyle={{}}
            />
          </View>
        </View>
        <View style={styles.buttonCont}>
          <Pressable
            onPress={() => props.navigation.navigate('cartScreen')}
            disabled={isLoading}
            style={CommonStyles.btnLG}>
            <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
              GO TO CART
            </Text>
          </Pressable>
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
    paddingTop: 32,
    // paddingBottom: 12,
  },
  heading: {
    paddingBottom: 14,
    textAlign: 'center',
    fontSize: 24,
    color: colors.colorFC0,
  },
  buttonCont: {
    // height: 64,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 15,
    // width: initialLayout.width * 0.5 - 44,
    paddingVertical: 25,
  },
  listCont: {
    // paddingHorizontal: 8,
    // paddingVertical: 12,
  },
  itemCont: {
    backgroundColor: colors.colorFFF,
    width: '100%',
    borderRadius: 8,
    marginBottom: 22,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  title: {
    color: colors.colorFC0,
    fontSize: 23,
    fontWeight: '500',
  },
  desc: {
    color: colors.color242323,
    fontSize: 14,
    fontWeight: '400',
  },
  price: {
    color: colors.color242323,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 8,
    textDecorationLine: 'line-through',
  },
  offerPrice: {
    color: colors.color242323,
    fontSize: 24,
    fontWeight: '400',
  },
  buttonTxt: {
    fontSize: 12,
    color: colors.colorFFF,
  },
  iconPM: {
    width: 15,
    height: 15,
    tintColor: colors.colorFFF,
  },
});
const mapStateToProps = state => {
  return {
    menuItems: state.menuReducer.menuItem,
    cartItem: state.menuReducer.cartItem,
    cartId: state.menuReducer.cartId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: item => dispatch(removeItem(item)),
    increaseQty: item => dispatch(increaseToCart(item)),
    decreaseQty: item => dispatch(subToCart(item)),
    addToCart: (item, cartId) => dispatch(addToCart(item, cartId)),
    clearCart: () => dispatch(emptyCart()),
    getTodaySpecialList: () => dispatch(appAction.getTodaySpecialList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodaySpecialScreen);
