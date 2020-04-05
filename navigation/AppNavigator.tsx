import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './auth/AuthNavigator';
import DrawerNavigator from './DrawerNavigator/DrawerNavigator';

const AppNavigator = () => {
  const isAuth = true;
  return (
    <NavigationContainer>
      {!isAuth && <AuthNavigator />}
      {isAuth && <DrawerNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
