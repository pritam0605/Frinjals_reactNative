/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import {BackgroundPattern} from '../components/background_pattern';
import Toast from 'react-native-easy-toast';
import {connect, useDispatch} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import Header from '../components/header';
import {setOrderType} from '../store/actions/commonActions';

const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const HomeScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [featured, setFeatured] = useState([]);
  const [banner, setBanner] = useState([]);
  const toastRef = useRef(null);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    props
      .getFeatured()
      .then(res => {
        // console.log('Featured: ', JSON.stringify(res));
        setFeatured(res);
      })
      .catch(e => toastRef?.current.show(e, 1000));
    props
      .getHomeBanner()
      .then(res => {
        // console.log('Banner: ', JSON.stringify(res));
        setBanner(res);
      })
      .catch(e => toastRef?.current.show(e, 1000));
  }, []);
  const selectOrderType = type => {
    dispatch(setOrderType(type));
    props.navigation.navigate('vendor');
  };
  const _getWelcomeMessage = () => {
    var hours = new Date().getHours();
    return hours < 12
      ? 'Good Morning'
      : hours < 18
      ? 'Good Afternoon'
      : 'Good Evening';
  };
  const _renderBanner = ({item}) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('menu', {id: item.id})}>
      <FastImage
        imageStyle={{borderRadius: 5}}
        // resizeMode="cover"
        source={{
          uri:
            'https://restaurent.scriptengines.com/uploads/settings/' +
            item.img +
            '_large.jpg',
        }}
        style={styles.offerBanner}
      />
    </TouchableOpacity>
  );
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Header {...props} />
        <View style={styles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <Text
              allowFontScaling={false}
              style={{fontSize: 14, fontWeight: '400', fontFamily: 'Livvic'}}>
              {_getWelcomeMessage()} {props.userData?.name} {','}
            </Text>
            <Text
              allowFontScaling={false}
              style={{fontSize: 18, fontWeight: '300', fontFamily: 'Livvic'}}>
              Grab Your
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 24,
                fontWeight: '300',
                color: colors.colorFC0,
                fontFamily: 'Livvic',
              }}>
              Delicious Meal!
            </Text>
            <View style={styles.bannerCont}>
              <Carousel
                ref={carouselRef}
                data={banner}
                renderItem={_renderBanner}
                sliderWidth={initialLayout.width - 24}
                itemWidth={initialLayout.width - 24}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 8,
                marginBottom: 4,
              }}>
              <TouchableOpacity
                onPress={() => selectOrderType('delivery')}
                style={{alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/delivery.png')}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 54,
                    marginVertical: 4,
                  }}
                />
                <Text allowFontScaling={false} style={styles.buttonText}>
                  Delivery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectOrderType('pickup')}
                style={{alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/take-away.png')}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 54,
                    marginVertical: 4,
                  }}
                />
                <Text allowFontScaling={false} style={styles.buttonText}>
                  Take Away
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selectOrderType('dinein')}
                style={{alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/dine-in.png')}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 54,
                    marginVertical: 4,
                  }}
                />
                <Text allowFontScaling={false} style={styles.buttonText}>
                  Dine-In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => props.navigation.navigate('customized')}
                style={{alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/customized.png')}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 54,
                    marginVertical: 4,
                  }}
                />
                <Text allowFontScaling={false} style={styles.buttonText}>
                  Customized
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sliderCnt}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Try Something New
              </Text>
              <View style={{height: 12}} />
              <Image
                resizeMode="cover"
                source={require('../assets/images/slider-banner.png')}
                style={styles.sliderBanner}
              />
            </View>
            <View
              style={{
                // paddingBottom: 20,
                borderBottomWidth: 0.55,
                borderColor: colors.color70,
              }}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Best Food For You
              </Text>
              <View style={{marginTop: 16, marginBottom: 30}}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={featured}
                  keyExtractor={item => item.id + ''}
                  renderItem={({item}) => (
                    <View
                      style={{
                        marginEnd: 18,
                        width: 90,
                        alignItems: 'flex-start',
                      }}>
                      <FastImage
                        source={{
                          uri: item.icon,
                        }}
                        style={{width: 90, height: 90, borderRadius: 4}}
                      />
                      <Text
                        allowFontScaling={false}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          fontFamily: 'Livvic',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 11,
                          fontFamily: 'Livvic',
                          fontWeight: '400',
                        }}>
                        {'₹' + item.price}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{marginTop: 24}}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: '#242222',
                  marginBottom: 12,
                  fontFamily: 'Livvic',
                }}>
                Today Special note:
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 13,
                  color: '#242222',
                  marginBottom: 12,
                  lineHeight: 19,
                  fontFamily: 'Livvic',
                }}>
                The other hand, we denounce with righteous indignation & dislike
                men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire. Men who are so
                beguiled and demoralized by the charms of pleasure of the
                moment, so blinded by desire.
              </Text>
            </View>
            <View style={styles.buttonCont}>
              <Pressable
                onPress={() => props.navigation.navigate('todaySpecial')}
                disabled={isLoading}
                style={CommonStyles.btnLG}>
                <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                  TODAY Special
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          <View style={{height: 10}} />
        </View>
        <Toast ref={toastRef} position="bottom" />
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // paddingTop: 12,
    // paddingBottom: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bannerCont: {
    marginVertical: 20,
    height: 139,
    // height: 192, //initialLayout.height * 0.2,
    // width: initialLayout.width - 24,
    // justifyContent: 'center',
  },
  offerBanner: {
    // width: initialLayout.width - 24,
    height: 139,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.colorECE,
  },
  banner: {
    height: 75,
  },
  banner2: {
    height: 150,
  },
  buttonCont2: {
    alignSelf: 'center',
    backgroundColor: colors.color000,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '80%',
    marginVertical: 4,
  },
  buttonCont: {
    alignSelf: 'center',
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: initialLayout.width * 0.5 - 44,
    paddingVertical: 50,
  },
  buttonText: {
    color: colors.color000,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Livvic',
  },
  sliderCnt: {
    marginVertical: 32,
  },
  sliderBanner: {
    height: 139,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFeatured: () => dispatch(appAction.getFeaturedProductList()),
    getHomeBanner: () => dispatch(appAction.getHomeBannerList()),
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
