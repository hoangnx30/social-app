import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MessageParamsList } from '../types';
import MessagesScreen from '../../screen/main/MessagesScreen/MessagesScreen';
import CreateNewMessageScreen from '../../screen/main/MessagesScreen/CreateNewMessage';
import MessageScreen from '../../screen/main/MessagesScreen/MessageScreen';
import { CustomHeaderButtonMCI } from '../../components/HeaderButton';

const MessageStackNavigator = createStackNavigator<MessageParamsList>();

const MessageNavigator = () => {
  return (
    <MessageStackNavigator.Navigator>
      <MessageStackNavigator.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
              <Item title="avatar" iconName="account-circle" />
            </HeaderButtons>
          ),
        }}
      />
      <MessageStackNavigator.Screen
        name="Message"
        component={MessageScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: route.params.headerTitle,
          };
        }}
      />
      <MessageStackNavigator.Screen
        name="NewMessage"
        component={CreateNewMessageScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: 'New message',
          };
        }}
      />
    </MessageStackNavigator.Navigator>
  );
};

export default MessageNavigator;
