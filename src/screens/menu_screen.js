/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useIsFocused} from '@react-navigation/native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect, useDispatch} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {
  addToCart,
  emptyCart,
  increaseToCart,
  removeItem,
  subToCart,
} from '../store/actions/cartAction';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
import Header from '../components/header';
import FastImage from 'react-native-fast-image';
import {sortMenuItem} from '../store/actions/commonActions';
const MenuScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [menuItems, setItem] = useState([]);
  const [vendorId] = useState(props.route.params.id);
  const isFocused = useIsFocused();
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getMenuList();
  }, []);
  const getMenuList = () => {
    setIsLoading(true);
    props
      .getMenuList(vendorId)
      // .then(item => setItem(item))
      .catch(e => toastRef.current?.show(e, 1000))
      .finally(() => setIsLoading(false));
  };
  const sortMenu = (type, order) => {
    dispatch(sortMenuItem(type, order));
  };
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
      setItem({});
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
              setItem({});
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
      <View
        style={{
          flex: 0.7,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <Text allowFontScaling={false} style={styles.title}>
          {item.name}
        </Text>
        <Text allowFontScaling={false} style={styles.desc}>
          {item.description}
        </Text>
        <Text allowFontScaling={false} style={styles.price}>
          {'₹' + item.price.toFixed(2)}
        </Text>
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
              alignSelf: 'flex-start',
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
      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
        <FastImage
          resizeMode="cover"
          source={{uri: item.icon}}
          style={{height: 80, width: 80, borderRadius: 6}}
        />
        {/* <View
          style={{
            width: 80,
            marginTop: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              height: 23,
              alignItems: 'center',
              paddingHorizontal: 8,
              // paddingVertical: 6,
              backgroundColor: colors.colorff6d6f,
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <Text allowFontScaling={false} style={styles.buttonTxt}>
              Qty 1
            </Text>
          </Pressable>
        </View> */}
      </View>
    </View>
  );
  const filterList = () => {
    return props.menuItems.filter(item => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  };
  return (
    <MenuProvider>
      <BackgroundPattern>
        <SafeAreaView style={CommonStyles.safeAreaView}>
          <Header willBack={true} {...props} />
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Text allowFontScaling={false} style={CommonStyles.heading}>
                Menu
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <View style={styles.inputCont}>
                <TextInput
                  allowFontScaling={false}
                  value={searchText}
                  autoCapitalize="none"
                  returnKeyType="done"
                  keyboardType="default"
                  onChangeText={text => setSearchText(text)}
                  placeholderTextColor={colors.color000}
                  style={styles.input}
                  placeholder="Enter to search"
                />
              </View>
              <Menu>
                <MenuTrigger customStyles={triggerStyles} text={'Sort'} />
                {/* <TouchableOpacity style>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/icon/sort.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.btnTxtFilter}>Sort</Text>
                  </TouchableOpacity> */}
                <MenuOptions>
                  <MenuOption
                    onSelect={() => sortMenu('price', false)}
                    text="By Price (high to low)"
                  />
                  <MenuOption
                    onSelect={() => sortMenu('price', true)}
                    text="By Price (low to high)"
                  />
                  <MenuOption
                    onSelect={() => sortMenu('name', true)}
                    text="By name (A to Z)"
                  />
                  <MenuOption
                    onSelect={() => sortMenu('name', false)}
                    text="By name (Z to A)"
                  />
                </MenuOptions>
              </Menu>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.colorff6d6f} />
            ) : (
              <FlatList
                data={searchText === '' ? props.menuItems : filterList()}
                keyExtractor={(item, index) => item + index}
                renderItem={_renderItem}
                removeClippedSubviews={true}
                maxToRenderPerBatch={6}
                initialNumToRender={8}
                legacyImplementation={false}
              />
            )}
          </View>
          <Toast ref={toastRef} position="bottom" />
        </SafeAreaView>
      </BackgroundPattern>
    </MenuProvider>
  );
};
const triggerStyles = {
  triggerText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.colorFFF,
  },
  triggerOuterWrapper: {
    backgroundColor: colors.buttonBg,
    flex: 1,
    paddingHorizontal: 16,
  },
  triggerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style: {
      flex: 1,
    },
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  btnCntFilter: {
    height: 29,
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.colorff6d6f,
    borderRadius: 5,
    flexDirection: 'row',
  },
  btnTxtFilter: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.colorFFF,
  },
  icon: {
    width: 12,
    height: 18,
    marginEnd: 6,
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
    fontSize: 18,
    fontWeight: '500',
    color: colors.color000,
  },
  desc: {
    color: colors.color61,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
  },
  price: {
    color: colors.color242323,
    fontSize: 13,
    fontWeight: '600',
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
  inputCont: {
    height: 36,
    borderRadius: 6,
    flex: 1,
    paddingRight: 12,
  },
  input: {
    fontSize: 13,
    borderRadius: 6,
    backgroundColor: colors.colorFFF,
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
    getMenuList: id => dispatch(appAction.getMenuList(id)),
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
