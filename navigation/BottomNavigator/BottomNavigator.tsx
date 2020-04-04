import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamsList } from '../types';
import HomeNavigator from '../Home/HomeNavigator';
import NotificationNavigator from '../Notification/NotificationNavigator';
import GroupNavigator from '../Group/GroupNavigator';
import MessageNavigator from '../Message/MessageNavigator';
import DocumentationNavigator from '../Documentation/DocumentationNavigator';

const BottomTabNavigator = createBottomTabNavigator<BottomTabParamsList>();

const BottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen name="HomeNavigator" component={HomeNavigator} />
      <BottomTabNavigator.Screen name="NotificationNavigator" component={NotificationNavigator} />
      <BottomTabNavigator.Screen name="GroupNavigator" component={GroupNavigator} />
      <BottomTabNavigator.Screen name="MessageNavigator" component={MessageNavigator} />
      <BottomTabNavigator.Screen name="DocumentationNavigator" component={DocumentationNavigator} />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigator;
