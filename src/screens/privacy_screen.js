import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
const PrivacyScreen = ({...props}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <WebView source={{uri: 'https://restaurent.scriptengines.com/pages/4'}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default PrivacyScreen;
