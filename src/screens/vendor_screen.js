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
  ActivityIndicator,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect, useDispatch} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
import Header from '../components/header';
import FastImage from 'react-native-fast-image';
import {selectVendor} from '../store/actions/commonActions';
const VendorScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [vendor, setVendor] = useState([]);
  const toastRef = useRef(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getVendorList();
  }, []);
  const getVendorList = () => {
    setIsLoading(true);
    props
      .getVendorList()
      .then(res => setVendor(res))
      .catch(e => toastRef.current?.show(e, 1000))
      .finally(() => setIsLoading(false));
  };
  const _selectVendor = item => {
    dispatch(selectVendor(item));
    props.navigation.navigate('menu', {id: item.id});
  };
  const _renderItem = ({item}) => (
    <View style={styles.itemCont}>
      <View style={{flex: 0.7}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={require('../assets/icon/metro-location.png')}
            style={{width: 22, height: 19, marginEnd: 4}}
          />
          <Text allowFontScaling={false} style={styles.title}>
            {item.name}
          </Text>
        </View>
        <View style={styles.descBox}>
          <Text allowFontScaling={false} style={{fontSize: 16}}>
            {item.address}
          </Text>
          <View style={{flex: 1, marginTop: 4}}>
            <Text allowFontScaling={false} style={styles.descriptionTxt}>
              Praesent tincidunt non velit quis Donec auctor placerat arcu
              vestibulum vel aliquet.
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.3, alignItems: 'flex-end', paddingHorizontal: 14}}>
        <Pressable onPress={() => _selectVendor(item)} style={styles.btnCont}>
          <Text allowFontScaling={false} style={styles.btnText}>
            Select
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <Header willBack={true} {...props} />
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text allowFontScaling={false} style={CommonStyles.heading}>
              Select Restaurant
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.colorff6d6f} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={vendor}
              renderItem={_renderItem}
              keyExtractor={item => item.id + ''}
            />
          )}
        </View>
      </SafeAreaView>
    </BackgroundPattern>
  );
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getVendorList: () => dispatch(appAction.getVendorList()),
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VendorScreen);
