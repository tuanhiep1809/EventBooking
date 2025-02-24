import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/navigations/AuthNavigator';
import Splash from './src/screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigation from './src/navigations/MainNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouter from './src/navigations/AppRouter';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
