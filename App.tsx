import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppRouter from './src/navigations/AppRouter';
import store from './src/redux/store';
import {HandleNotification} from './src/utils/handleNotification';

const App = () => {
  useEffect(() => {
    HandleNotification.checkNotificationPersion();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
