import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import AppRouter from './src/navigations/AppRouter';
import store from './src/redux/store';

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
