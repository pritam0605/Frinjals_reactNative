/* eslint-disable react-hooks/exhaustive-deps */
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
  StatusBar,
  Modal,
  TextInput,
  Keyboard,
  PermissionsAndroid,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles, {initialLayout} from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect, useDispatch} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {BackgroundPattern} from '../components/background_pattern';
import {FlatList} from 'react-native-gesture-handler';
import Header from '../components/header';
import {AddNewAddress} from '../components/add_new_address';
import {setAddress} from '../store/actions/commonActions';
const AddressListScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmNewAdd, setConfirmNewAdd] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [newAdd, setNewAdd] = useState({});
  const [apartment, setApartment] = useState('');
  const [intercom, setIntercom] = useState('');
  const [floor, setFloor] = useState('');
  const [entry, setEntry] = useState('');
  const toastRef = useRef(null);
  const floorRef = useRef(null);
  const entryRef = useRef(null);
  const intercomRef = useRef(null);
  const [showHeader] = useState(props.route.params.showHeader || false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    getAddressList();
  }, []);
  const getAddressList = () => {
    props
      .getAddressList()
      .then(() => toastRef.current?.show('fetched.', 1000))
      .catch(e => toastRef.current?.show(e, 1000));
  };
  const _fetchCurrentAddress = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    console.log(granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setIsLoading(true);
      Geolocation.getCurrentPosition(info => {
        Geocoder.geocodePosition({
          lat: info.coords.latitude,
          lng: info.coords.longitude,
        })
          .then(res => {
            console.log(JSON.stringify(res));
            setIsLoading(false);
            let data = {
              lat: res[0].position.lat,
              lng: res[0].position.lng,
              address: res[0].formattedAddress,
              placeId: '',
            };
            setNewAdd(data);
            // console.log(JSON.stringify(newAdd));
            setConfirmNewAdd(true);
          })
          .catch(() => setIsLoading(false));
      }).catch(() => setIsLoading(false));
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device location',
            message:
              'We required Location permission in order to get device location ' +
              'Please grant us.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          _fetchCurrentAddress();
        } else {
          console.log("You don't have access for the location");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const deleteAddress = id => {
    props
      .deleteAddress(id)
      .then(res => toastRef.current?.show(res, 1000))
      .catch(e => console.log('Error: ', e));
  };
  const handleSaveAdd = data => {
    // console.log(JSON.stringify(data));
    setNewAdd(data);
    setAddAddressModal(false);
    setConfirmNewAdd(true);
  };
  const submitNewAdd = () => {
    Keyboard.dismiss();
    props
      .submitNewAdd(
        JSON.stringify({
          apartment,
          intercom,
          floor,
          entry,
          lat: newAdd.lat,
          lng: newAdd.lng,
          address: newAdd.address,
          // placeId: newAdd.placeId,
        }),
      )
      .then(() => getAddressList())
      .finally(() => {
        setApartment('');
        setIntercom('');
        setFloor('');
        setEntry('');
        setConfirmNewAdd(false);
      });
  };
  const cancelSubmit = () => {
    setApartment('');
    setIntercom('');
    setFloor('');
    setEntry('');
    setConfirmNewAdd(false);
  };
  const _deliverHere = item => {
    dispatch(setAddress(item));
    props.navigation.pop();
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
          <Text
            allowFontScaling={false}
            style={[styles.title, {fontSize: 17}]}
            numberOfLines={1}>
            {item.address.split(',').slice(0, 2).join(', ')}
          </Text>
        </View>
        <View style={styles.descBox}>
          <Text allowFontScaling={false} style={{fontSize: 16}}>
            {item.address}
          </Text>
          {/* <View style={{flex: 1, marginTop: 4}}>
            <Text allowFontScaling={false} style={styles.descriptionTxt}>
              Praesent tincidunt non velit quis Donec auctor placerat arcu
              vestibulum vel aliquet.
            </Text>
          </View> */}
        </View>
      </View>
      <View style={{flex: 0.3, alignItems: 'flex-end', paddingHorizontal: 14}}>
        {showHeader ? (
          <Pressable
            style={styles.btnCont}
            onPress={() => deleteAddress(item.id)}>
            <Text allowFontScaling={false} style={styles.btnText}>
              Delete
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => _deliverHere(item)} style={styles.btnCont}>
            <Text allowFontScaling={false} style={styles.btnText}>
              Deliver Here
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        {showHeader ? (
          <Header {...props} />
        ) : (
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
        )}

        <View style={styles.container}>
          <View
            style={{
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
                Delivery Location
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={_fetchCurrentAddress}
              style={styles.addCont}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: colors.color000,
                }}>
                Current Address
              </Text>
              <View style={styles.btnChg}>
                <Image
                  source={require('../assets/icon/gps.png')}
                  style={{
                    height: 16,
                    width: 14,
                    tintColor: colors.colorFC0,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 12}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 24,
                fontWeight: '400',
                color: colors.colorFC0,
              }}>
              Saved Address
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.deliveryAddress}
            renderItem={_renderItem}
            keyExtractor={item => item.id + ''}
          />
          <TouchableOpacity
            style={styles.floating}
            onPress={() => setAddAddressModal(true)}>
            <Image
              resizeMode="contain"
              source={require('../assets/icon/editList.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        <Toast ref={toastRef} position="bottom" />
        <Modal
          onRequestClose={() => setAddAddressModal(false)}
          animationType="slide"
          transparent={true}
          visible={addAddressModal}>
          <AddNewAddress
            dismiss={() => setAddAddressModal(false)}
            save={handleSaveAdd}
          />
        </Modal>
        <Modal
          onRequestClose={cancelSubmit}
          animationType="slide"
          transparent={true}
          visible={confirmNewAdd}>
          <View style={styles.modalBody}>
            <View style={styles.modalCont}>
              <Text allowFontScaling={false} style={styles.title}>
                More Info
              </Text>
              <View style={{height: 12}} />
              <View style={styles.inputCont}>
                <TextInput
                  allowFontScaling={false}
                  value={apartment}
                  returnKeyType="next"
                  placeholder="Enter Apartment/Building"
                  onSubmitEditing={() => floorRef?.current.focus()}
                  keyboardType="default"
                  onChangeText={text => setApartment(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer, styles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <TextInput
                  ref={floorRef}
                  allowFontScaling={false}
                  value={floor}
                  returnKeyType="next"
                  placeholder="Enter Floor no."
                  onSubmitEditing={() => entryRef?.current.focus()}
                  keyboardType="default"
                  onChangeText={text => setFloor(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer, styles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <TextInput
                  ref={entryRef}
                  allowFontScaling={false}
                  value={entry}
                  returnKeyType="next"
                  placeholder="Enter entry"
                  onSubmitEditing={() => intercomRef?.current.focus()}
                  keyboardType="default"
                  onChangeText={text => setEntry(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer, styles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <TextInput
                  allowFontScaling={false}
                  value={intercom}
                  returnKeyType="next"
                  placeholder="Enter intercom"
                  onSubmitEditing={submitNewAdd}
                  keyboardType="default"
                  onChangeText={text => setIntercom(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer, styles.inputContainer]}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Pressable
                  onPress={cancelSubmit}
                  disabled={isLoading}
                  style={styles.btnLG}>
                  <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={submitNewAdd}
                  disabled={isLoading}
                  style={styles.btnLG}>
                  <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  floating: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 45,
    bottom: 22,
    right: 11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.colorFC0,
  },
  modalBody: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCont: {
    backgroundColor: colors.colorFFF,
    width: initialLayout.width - 54,
    borderRadius: 6,
    // alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  inputCont: {
    marginBottom: 12,
    alignItems: 'center',
  },
  inputContainer: {
    width: initialLayout.width - 90,
  },
  btnLG: {
    width: initialLayout.width * 0.3,
    height: 44,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    deliveryAddress: state.addressReducer.deliveryAddress,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAddressList: () => dispatch(appAction.getAddressList()),
    submitNewAdd: data => dispatch(appAction.addDeliveryAddress(data)),
    deleteAddress: id => dispatch(appAction.deleteAddress(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressListScreen);
