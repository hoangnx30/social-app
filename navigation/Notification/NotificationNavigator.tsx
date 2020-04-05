import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NotificationParamsList } from '../types';
import NotificationsScreen from '../../screen/main/NotificationsScreen/NotificationsScreen';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';
import { CustomHeaderButtonMCI } from '../../components/HeaderButton';

const NotificationStackNavigator = createStackNavigator<NotificationParamsList>();

const NotificationNavigator = () => {
  return (
    <NotificationStackNavigator.Navigator>
      <NotificationStackNavigator.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
              <Item title="avatar" iconName="account-circle" />
            </HeaderButtons>
          ),
        }}
      />
      <NotificationStackNavigator.Screen name="Post" component={PostScreen} />
    </NotificationStackNavigator.Navigator>
  );
};

export default NotificationNavigator;
