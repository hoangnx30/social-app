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
    <BottomTabNavigator.Navigator
      screenOptions={{ tabBarLabel: () => null }}
      tabBarOptions={{ inactiveTintColor: 'black' }}
    >
      <BottomTabNavigator.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={({ navigation, route }) => {
          let tabBarVisible = true;
          if (route.state) {
            const routes = route.state.routes;
            tabBarVisible = routes[routes.length - 1].name === 'UpLoadPost' ? false : true;
          }
          return {
            tabBarIcon: ({ color }) => {
              return <MaterialCommunityIcons name="home" size={32} color={color} />;
            },
            tabBarVisible,
          };
        }}
      />
      <BottomTabNavigator.Screen
        name="NotificationNavigator"
        component={NotificationNavigator}
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="earth" size={32} color={color} /> }}
      />
      <BottomTabNavigator.Screen
        name="GroupNavigator"
        component={GroupNavigator}
        options={{ tabBarIcon: ({ color }) => <MaterialIcons name="group" size={32} color={color} /> }}
      />
      <BottomTabNavigator.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="message" size={32} color={color} />,
        }}
      />
      <BottomTabNavigator.Screen
        name="DocumentationNavigator"
        component={DocumentationNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="file-document" size={32} color={color} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigator;
