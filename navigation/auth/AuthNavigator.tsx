import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screen/users/SignInScreen';
import ForgotPasswordScreen from '../../screen/users/ForgotPasswordScreen';

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} options={{ headerTitle: 'Sign In' }} />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerTitle: 'Forgot Password' }}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
