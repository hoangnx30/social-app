import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeParamsList } from '../types';
import HomeScreen from '../../screen/main/HomeScreen/HomeScreen';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';
import UploadPostScreen from '../../screen/main/HomeScreen/UploadPostScreen';

const HomeStackNavigator = createStackNavigator<HomeParamsList>();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
      <HomeStackNavigator.Screen name="Post" component={PostScreen} options={{ headerTitle: 'Post' }} />
      <HomeStackNavigator.Screen name="UpLoadPost" component={UploadPostScreen} />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeNavigator;
