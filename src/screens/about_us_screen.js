import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
const AboutUsScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const doLogout = () => {
    setIsLoading(true);
    props
      .doLogout()
      .then(res =>
        toastRef.current?.show(res, 1000, () => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'landing'}],
          });
        }),
      )
      .finally(() => setIsLoading(false));
  };
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false}>AboutUsScreen Screen</Text>
      <Toast ref={toastRef} position="bottom" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
export default connect(mapStateToProps, mapDispatchToProps)(AboutUsScreen);
