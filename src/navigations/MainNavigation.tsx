import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigation from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

const MainNavigation = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Man" component={DrawerNavigator} />
    </stack.Navigator>
  );
};

export default MainNavigation;
