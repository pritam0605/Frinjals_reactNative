/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground} from 'react-native';

export const BackgroundPattern = ({children}) => {
  return (
    <ImageBackground
      style={{height: '100%', width: '100%'}}
      source={require('../assets/images/pattern.png')}
      resizeMethod="scale"
      resizeMode="stretch">
      {children}
    </ImageBackground>
  );
};
