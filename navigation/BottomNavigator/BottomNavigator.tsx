import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { BottomTabParamsList } from '../types';
import HomeNavigator from '../Home/HomeNavigator';
import NotificationNavigator from '../Notification/NotificationNavigator';
import GroupNavigator from '../Group/GroupNavigator';
import MessageNavigator from '../Message/MessageNavigator';
import DocumentationNavigator from '../Documentation/DocumentationNavigator';

const BottomTabNavigator = createBottomTabNavigator<BottomTabParamsList>();

const BottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator screenOptions={{ tabBarLabel: () => null }}>
      <BottomTabNavigator.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ tabBarIcon: () => <MaterialCommunityIcons name="home" size={32} /> }}
      />
      <BottomTabNavigator.Screen
        name="NotificationNavigator"
        component={NotificationNavigator}
        options={{ tabBarIcon: () => <MaterialCommunityIcons name="earth" size={32} /> }}
      />
      <BottomTabNavigator.Screen
        name="GroupNavigator"
        component={GroupNavigator}
        options={{ tabBarIcon: () => <MaterialIcons name="group" size={32} /> }}
      />
      <BottomTabNavigator.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={{
          tabBarIcon: () => <MaterialIcons name="message" size={32} />,
        }}
      />
      <BottomTabNavigator.Screen
        name="DocumentationNavigator"
        component={DocumentationNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="file-document" size={32} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigator;
