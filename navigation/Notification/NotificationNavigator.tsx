import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NotificationParamsList } from '../types';
import NotificationsScreen from '../../screen/main/NotificationsScreen/NotificationsScreen';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';

const NotificationStackNavigator = createStackNavigator<NotificationParamsList>();

const NotificationNavigator = () => {
  return (
    <NotificationStackNavigator.Navigator>
      <NotificationStackNavigator.Screen name="Notification" component={NotificationsScreen} />
      <NotificationStackNavigator.Screen name="Post" component={PostScreen} />
    </NotificationStackNavigator.Navigator>
  );
};

export default NotificationNavigator;
