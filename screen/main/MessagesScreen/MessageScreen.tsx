import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import { fetchConversations } from '../../../store/action/message.action';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const MessageScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = route.params.user;
  const conversationId = route.params.conversationId;
  const dispatch = useDispatch();
  useEffect(() => {
    firebase
      .database()
      .ref(`conversations/${conversationId}/messages`)
      .on('child_added', (snapshot) => {
        setMessages((value) => GiftedChat.append(value, snapshot.val()));
      });
  }, []);
  const onSend = (message) => {
    message['0'].createAt = Date.now();
    firebase
      .database()
      .ref(`conversations/${conversationId}/messages`)
      .push(message)
      .then(() => {
        dispatch(fetchConversations([conversationId], currentUser.userId));
      });
  };

  return (
    <View style={styles.screen}>
      <GiftedChat onSend={onSend} user={{ _id: currentUser.userId, name: currentUser.fullName }} messages={messages} />
    </View>
  );
};

export default MessageScreen;
