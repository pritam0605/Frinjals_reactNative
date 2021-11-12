import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CommonStyles from '../themes/styles';
const KeyboardAwareView = ({children}) => {
  return (
    <KeyboardAwareScrollView
      bounces={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={CommonStyles.keyboardAwareScroll}>
      {children}
    </KeyboardAwareScrollView>
  );
};
export default KeyboardAwareView;
