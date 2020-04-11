import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './auth/AuthNavigator';
import DrawerNavigator from './DrawerNavigator/DrawerNavigator';
import { rootReducerType } from '../store/reducer';
import { UserInfo } from '../store/action/types';

const AppNavigator = () => {
  const [isAuthentication, setIsAuthentication] = useState<boolean>(false);

  const userInfo: UserInfo = useSelector<rootReducerType>((state) => state.authState.userInfo);
  if (userInfo.accessToken) {
    setIsAuthentication(true);
  }
  return (
    <NavigationContainer>
      {!isAuthentication && <AuthNavigator />}
      {isAuthentication && <DrawerNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
