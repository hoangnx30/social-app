import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { BottomTabParamsList } from '../types';
import HomeNavigator from '../Home/HomeNavigator';
import NotificationNavigator from '../Notification/NotificationNavigator';
import GroupNavigator from '../Group/GroupNavigator';
import MessageNavigator from '../Message/MessageNavigator';
import DocumentationNavigator from '../Documentation/DocumentationNavigator';
import Color from '../../constants/Color';

const BottomTabNavigator = createBottomTabNavigator<BottomTabParamsList>();

const BottomNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{ tabBarLabel: () => null }}
      tabBarOptions={{ inactiveTintColor: 'black', activeTintColor: Color.primary }}
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
          if (route.state) {
            const routes = route.state.routes;
            tabBarVisible = routes[routes.length - 1].name === 'Post' ? false : true;
          }
          return {
            tabBarIcon: ({ color }) => {
              return <MaterialCommunityIcons name="home" size={30} color={color} />;
            },
            tabBarVisible,
          };
        }}
      />
      <BottomTabNavigator.Screen
        name="NotificationNavigator"
        component={NotificationNavigator}
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="earth" size={30} color={color} /> }}
      />
      <BottomTabNavigator.Screen
        name="GroupNavigator"
        component={GroupNavigator}
        options={({ route, navigation }) => {
          let tabBarVisible = true;
          if (route.state) {
            const routes = route.state.routes;
            tabBarVisible = routes[routes.length - 1].name === 'CreateGroup' ? false : true;
          }
          return {
            tabBarIcon: ({ color }) => <MaterialIcons name="group" size={30} color={color} />,
            tabBarVisible,
          };
        }}
      />
      <BottomTabNavigator.Screen
        name="MessageNavigator"
        component={MessageNavigator}
        options={({ route, navigation }) => {
          let tabBarVisible = true;
          if (route.state) {
            const routes = route.state.routes;
            tabBarVisible = routes[routes.length - 1].name === 'Message' ? false : true;
          }

          return {
            tabBarIcon: ({ color }) => <MaterialIcons name="message" size={30} color={color} />,
            tabBarVisible,
          };
        }}
      />
      <BottomTabNavigator.Screen
        name="DocumentationNavigator"
        component={DocumentationNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <MaterialCommunityIcons name="file-document" size={30} color={color} />;
          },
        }}
      />

      {/* <BottomTabNavigator.Screen
        name="DocumentationNavigator"
        component={DocumentationNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="bars" size={30} color={color} />,
        }}
      /> */}
    </BottomTabNavigator.Navigator>
  );
};

export default BottomNavigator;
