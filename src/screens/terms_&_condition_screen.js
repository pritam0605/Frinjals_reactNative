import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
const TermAndConditionScreen = ({...props}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <WebView source={{uri: 'https://restaurent.scriptengines.com/pages/1'}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default TermAndConditionScreen;
