import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigation from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';

const MainNavigation = () => {
  const stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView>
      <Host>
        <stack.Navigator screenOptions={{headerShown: false}}>
          <stack.Screen name="Man" component={DrawerNavigator} />
        </stack.Navigator>
      </Host>
    </GestureHandlerRootView>
  );
};

export default MainNavigation;
