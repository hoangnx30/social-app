import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer, useRoute } from '@react-navigation/native';

import AuthNavigator from './auth/AuthNavigator';
import DrawerNavigator from './DrawerNavigator/DrawerNavigator';
import { rootReducerType } from '../store/reducer';
import { UserInfo } from '../store/action/types';

const AppNavigator = () => {
  let isAuthentication = false;

  const userInfo: UserInfo = useSelector<rootReducerType>((state) => state.authState.userInfo);

  if (userInfo.accessToken) {
    isAuthentication = true;
  }
  return (
    <NavigationContainer>
      {!isAuthentication && <AuthNavigator />}
      {isAuthentication && <DrawerNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
