import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedAvatar } from 'react-native-gifted-chat';
import moment from 'moment';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

interface Props {
  user?: any;
  lastMessageInfo?: string;
  conversationId?: string;
  navigation?: any;
}

const ConversationItem = (props: Props) => {
  const user = useSelector((state) => state.authState.user);
  return (
    <TouchableNativeFeedback
      style={{ paddingVertical: 5 }}
      onPress={() => {
        props.navigation.navigate('Message', {
          headerTitle: props.user.name,
          user: user,
          conversationId: props.conversationId,
        });
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <GiftedAvatar
          user={props.user}
          avatarStyle={{ height: 50, width: 50, borderRadius: 25 }}
          textStyle={{ fontSize: 20 }}
        />
        <View style={{ marginLeft: 7, width: '100%', flexShrink: 1 }}>
          <Text style={{ overflow: 'hidden', fontSize: 17, paddingBottom: 5 }}>{props.user.name}</Text>
          <Text style={{ fontSize: 13, color: '#a1a1a1', paddingRight: 5 }} numberOfLines={1}>
            {`${user.userId === props.lastMessageInfo.user._id ? 'You: ' : ''}${props.lastMessageInfo.text}`}
          </Text>
        </View>
        <View>
          <Text style={{ overflow: 'hidden', fontSize: 17, color: 'white', paddingBottom: 5 }}>
            {moment(Date.now()).format('hh:mm')}
          </Text>
          <Text style={{ fontSize: 13, color: '#a1a1a1' }}>
            {moment(props.lastMessageInfo.createAt).format('hh:mm')}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ConversationItem;
