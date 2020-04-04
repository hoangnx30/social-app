import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './auth/AuthNavigator';
import { RootParamsList } from './types';
import BottomNavigator from './BottomNavigator/BottomNavigator';
import DrawerNavigator from './DrawerNavigator/DrawerNavigator';

const RootStackNavigator = createStackNavigator<RootParamsList>();

const IsAuthNavigator = () => {
  return (
    <RootStackNavigator.Navigator>
      <RootStackNavigator.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <RootStackNavigator.Screen name="BottomNavigator" component={BottomNavigator} />
    </RootStackNavigator.Navigator>
  );
};

const AppNavigator = () => {
  const isAuth = true;
  return (
    <NavigationContainer>
      {!isAuth && <AuthNavigator />}
      {isAuth && <IsAuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
