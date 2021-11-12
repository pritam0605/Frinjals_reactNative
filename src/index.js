import React from 'react';
import {LogBox} from 'react-native';
import * as Sentry from '@sentry/react-native';
// Redux implementation
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as StoreProvider} from 'react-redux';
// Redux Store import
import {store, persistor} from './store';
import Navigation from './navigation';
import colors from './themes/colors';
// Default Props
import {
  setCustomText,
  setCustomTouchableOpacity,
} from 'react-native-global-props';
const customTextProps = {
  style: {
    fontFamily: 'Livvic',
    color: colors.color000,
  },
};
const customTouchableOpacityProps = {
  hitSlop: {top: 10, right: 10, left: 10, bottom: 10},
};
setCustomText(customTextProps);
setCustomTouchableOpacity(customTouchableOpacityProps);
const App = () => {
  React.useEffect(() => {
    Sentry.init({
      dsn: 'https://1bb2350a5c144edba465c463f4a87eaf@o926721.ingest.sentry.io/5935379',
    });
    LogBox.ignoreLogs([
      'Require cycle: node_modules',
      'VirtualizedLists should never be nested',
    ]);
  }, []);
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
