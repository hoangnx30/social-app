import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedAvatar } from 'react-native-gifted-chat';
import moment from 'moment';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface Props {
  user?: any;
  lastMessage?: string;
}

const ConversationItem = (props: Props) => {
  return (
    <TouchableNativeFeedback style={{ paddingVertical: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GiftedAvatar
          user={{ name: 'Nguyen Xuan Hoang' }}
          avatarStyle={{ height: 50, width: 50, borderRadius: 25 }}
          textStyle={{ fontSize: 20 }}
        />
        <View style={{ marginLeft: 7, width: '100%', flexShrink: 1 }}>
          <Text style={{ overflow: 'hidden', fontSize: 17, paddingBottom: 5 }}>{props.user.fullName || 'Nguyen Xuan Hoang'}</Text>
          <Text style={{ fontSize: 13, color: '#a1a1a1', paddingRight: 5 }} numberOfLines={1}>
            {props.lastMessage ||
              'This is last message This is last message This is last message This is last message This is last message '}
          </Text>
        </View>
        <View>
          <Text style={{ overflow: 'hidden', fontSize: 17, color: 'white', paddingBottom: 5 }}>{moment(Date.now()).format('hh:mm')}</Text>
          <Text style={{ fontSize: 13, color: '#a1a1a1' }}>{moment(Date.now()).format('hh:mm')}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ConversationItem;
