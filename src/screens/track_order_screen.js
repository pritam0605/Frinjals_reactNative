/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles, {initialLayout} from '../themes/styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
const TrackOrderScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialRegion] = useState({
    latitude: parseFloat(props?.vendor?.lat),
    longitude: parseFloat(props?.vendor?.lng),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const toastRef = useRef(null);
  console.log({
    latitude: parseFloat(props?.vendor?.lat),
    longitude: parseFloat(props?.vendor?.lng),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            zoomEnabled={true}
            initialRegion={initialRegion}>
            <Marker coordinate={initialRegion} />
          </MapView>
          <View style={{paddingHorizontal: 16, paddingVertical: 18}}>
            <Text
              allowFontScaling={false}
              style={{fontSize: 16, color: colors.colorFC0}}>
              Track Order
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <Image
                resizeMode="contain"
                source={require('../assets/icon/metro-location.png')}
                style={{width: 20, height: 20}}
              />
              <Text
                allowFontScaling={false}
                style={{fontSize: 24, color: colors.color0f0f0f}}>
                {props?.vendor.name}
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 14,
                lineHeight: 15,
                color: colors.color242323,
                fontWeight: '300',
              }}>
              {props?.vendor?.address}
            </Text>
            <View style={{height: 16}} />
            <Pressable
              style={CommonStyles.btnLG}
              onPress={() => props.navigation.pop()}>
              <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                Back To order
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
  },
});
const mapStateToProps = state => {
  return {
    vendor: state.common.vendor,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TrackOrderScreen);
