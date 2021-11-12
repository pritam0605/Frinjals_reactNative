/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../themes/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Toast from 'react-native-easy-toast';
import {GOOGLE_PLACES_API_KEY} from '../constants';
import {BackgroundPattern} from './background_pattern';
import CommonStyles from '../themes/styles';

export const AddNewAddress = ({save, dismiss, ...props}) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [addressComponents, setAddressComponents] = useState([]);
  const [formattedAddress, setFormattedAddress] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const placeRef = useRef(null);
  const toastErrorRef = useRef(null);
  const handleSave = () => {
    if (lat !== null && lng !== null) {
      let data = {
        lat,
        lng,
        address: formattedAddress,
        placeId,
      };
      save(data);
    } else {
      toastErrorRef.current?.show('Search and select first', 1000);
    }
  };
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => dismiss()}>
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
          <TouchableOpacity onPress={handleSave}>
            <Image
              source={require('../assets/icon/checkmark.png')}
              style={{
                marginHorizontal: 16,
                width: 20,
                height: 20,
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 32,
            backgroundColor: colors.colorFFF,
          }}>
          <GooglePlacesAutocomplete
            ref={placeRef}
            minLength={3}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en', // language of the results
              // components:
              //   'country:' + this.props.getCity.country.sortname.toLowerCase(),
            }}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setLat(details.geometry.location.lat);
              setLng(details.geometry.location.lng);
              setAddressComponents(details.address_components);
              setFormattedAddress(details.formatted_address);
              setPlaceId(details.place_id);
            }}
            onFail={error => console.error(error)}
            requestUrl={{
              url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
              useOnPlatform: 'web',
            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                marginTop: 10,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
                borderColor: colors.color000,
                borderWidth: 0.55,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            placeholder={'Enter Place Address'}
          />
        </View>
        <Toast
          ref={toastErrorRef}
          position="bottom"
          style={{backgroundColor: colors.colorFC0}}
        />
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.color000,
  },
});
