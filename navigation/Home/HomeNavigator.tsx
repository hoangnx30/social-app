import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HomeParamsList } from '../types';
import HomeScreen from '../../screen/main/HomeScreen/HomeScreen';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';
import UploadPostScreen from '../../screen/main/HomeScreen/UploadPostScreen';
import { CustomHeaderButtonMCI, CustomHeaderButtonMI } from '../../components/HeaderButton';

const HomeStackNavigator = createStackNavigator<HomeParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
              <Item title="avatar" iconName="account-circle" />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMI}>
              <Item title="search" iconName="search" onPress={() => {}} />
            </HeaderButtons>
          ),
        }}
      />
      <HomeStackNavigator.Screen name="Post" component={PostScreen} options={{ headerTitle: 'Post' }} />
      <HomeStackNavigator.Screen
        name="UpLoadPost"
        component={UploadPostScreen}
        options={({ navigation, route }) => {
          return {
            headerTitle: 'Update Status',
          };
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
