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
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import {BackgroundPattern} from '../components/background_pattern';
import {FlatList} from 'react-native-gesture-handler';
const CustomizedScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const _renderItem = ({item}) => (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
        <Text
          allowFontScaling={false}
          style={{fontSize: 16, fontWeight: '400'}}>
          Custom order related text here
        </Text>
        <Image
          source={require('../assets/icon/editList.png')}
          style={{width: 15, height: 15, tintColor: colors.color868484}}
        />
      </View>
      <View style={{paddingEnd: 18}}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 14,
            lineHeight: 15,
            fontWeight: '300',
            color: colors.color242323,
          }}>
          Praesent tincidunt non velit quis auctor Donec auctor placerat arcu
          placerat vestibulum.
        </Text>
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
            source={require('../assets/icon/back.png')}
            style={{
              marginHorizontal: 16,
              width: 20,
              height: 20,
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5]}
            keyExtractor={item => item + ''}
            renderItem={_renderItem}
            style={{flex: 1}}
            ItemSeparatorComponent={() => <View style={{height: 14}} />}
            contentContainerStyle={{
              backgroundColor: colors.colorFFF,
              paddingHorizontal: 16,
              paddingVertical: 18,
              borderRadius: 6,
              elevation: 1.5,
            }}
          />
          <View style={{marginBottom: 14, alignItems: 'center'}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 24,
                fontWeight: '400',
                color: colors.colorFC0,
              }}>
              For Customized Order
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 24,
                fontWeight: '400',
                color: colors.colorFC0,
              }}>
              Please contact our Support Team
            </Text>
          </View>
          <View style={styles.socialCont}>
            <View style={styles.socialIconCont}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                source={require('../assets/icon/call.png')}
                style={styles.socialIconCont}
              />
            </View>
            <View style={styles.socialIconCont}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                source={require('../assets/icon/whatsapp.png')}
                style={styles.socialIconCont}
              />
            </View>
            <View style={styles.socialIconCont}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                source={require('../assets/icon/message.png')}
                style={styles.socialIconCont}
              />
            </View>
            <View style={styles.socialIconCont}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                source={require('../assets/icon/gmail.png')}
                style={styles.socialIconCont}
              />
            </View>
          </View>
          <View style={styles.buttonCont}>
            <Pressable
              onPress={() => props.navigation.pop()}
              disabled={isLoading}
              style={CommonStyles.btnLG}>
              <Text allowFontScaling={false} style={CommonStyles.btnTxt}>
                Go To Home
              </Text>
            </Pressable>
          </View>
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
    // paddingVertical: 18,
  },
  btnText: {
    fontSize: 16,
    color: colors.colorFFF,
    textAlign: 'center',
  },
  socialCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 35,
    width: initialLayout.width * 0.7,
    alignItems: 'center',
  },
  socialIconCont: {
    height: 27,
    width: 27,
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: colors.iconColor,
    // backgroundColor: colors.colorF72,
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
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomizedScreen);
