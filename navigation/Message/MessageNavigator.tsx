import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MessageParamsList } from '../types';
import MessagesScreen from '../../screen/main/MessagesScreen/MessagesScreen';
import CreateNewMessageScreen from '../../screen/main/MessagesScreen/CreateNewMessage';

const MessageStackNavigator = createStackNavigator<MessageParamsList>();

const MessageNavigator = () => {
  return (
    <MessageStackNavigator.Navigator>
      <MessageStackNavigator.Screen name="Messages" component={MessagesScreen} />
      <MessageStackNavigator.Screen name="Message" component={MessagesScreen} />
      <MessageStackNavigator.Screen name="NewMessage" component={CreateNewMessageScreen} />
    </MessageStackNavigator.Navigator>
  );
};

export default MessageNavigator;
