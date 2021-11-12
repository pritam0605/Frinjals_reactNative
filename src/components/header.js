/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../themes/colors';
import {connect} from 'react-redux';

const Header = ({willBack = false, ...props}) => {
  return (
    <View style={styles.container}>
      {willBack ? (
        <TouchableOpacity
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onPress={() => props.navigation.goBack()}>
          <Image
            resizeMode="center"
            source={require('../assets/icon/back.png')}
            style={{height: 22, width: 22, tintColor: colors.colorFFF}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={require('../assets/icon/menu.png')}
            style={{height: 22, width: 22}}
          />
        </TouchableOpacity>
      )}
      <View style={styles.btnCnt}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('cartScreen')}>
          <Image
            source={require('../assets/icon/cart.png')}
            style={styles.icon}
          />
          {props.cartItem?.length > 0 && <View style={styles.countCont} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.color000,
  },
  btnCnt: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: colors.colorFFF,
  },
  countCont: {
    position: 'absolute',
    top: -4,
    right: 2,
    backgroundColor: colors.colorff6d6f,
    height: 10,
    width: 10,
    borderRadius: 100,
  },
});
const mapStateToProps = state => {
  return {
    cartItem: state.menuReducer.cartItem,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
