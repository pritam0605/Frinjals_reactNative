/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_PLACES_API_KEY} from '../constants';
const OrderStatusScreen = ({...props}) => {
  const [order] = useState(props?.route?.params?.order);
  const [initialRegion] = useState({
    latitude: parseFloat(props?.route?.params?.order?.restorant?.lat),
    longitude: parseFloat(props?.route?.params?.order?.restorant?.lng),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const toastRef = useRef(null);
  useEffect(() => {
    // console.log(JSON.stringify(order?.restorant));
  }, [order]);

  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <StatusBar backgroundColor={colors.color000} />
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
          <Text style={{color: colors.colorFFF, fontSize: 16}}>
            Order Status
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            zoomEnabled={true}
            initialRegion={initialRegion}>
            <Marker coordinate={initialRegion}>
              <Image
                source={require('../assets/icon/restaurant.png')}
                style={{height: 20, width: 20, tintColor: colors.buttonBg}}
              />
            </Marker>
            <Marker
              coordinate={{
                latitude: parseFloat(order?.address?.lat),
                longitude: parseFloat(order?.address?.lng),
              }}>
              <Image
                source={require('../assets/icon/user-alt.png')}
                style={{height: 20, width: 20, tintColor: colors.buttonBg}}
              />
            </Marker>
            <MapViewDirections
              origin={initialRegion}
              mode="DRIVING"
              strokeWidth={3}
              strokeColor={colors.buttonBg}
              destination={{
                latitude: parseFloat(order?.address?.lat),
                longitude: parseFloat(order?.address?.lng),
              }}
              apikey={GOOGLE_PLACES_API_KEY}
            />
          </MapView>
        </View>
        <Toast ref={toastRef} position="bottom" />
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.color000,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doSubmitEmail: fData => dispatch(authAction.doSubmitEmail(fData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderStatusScreen);
