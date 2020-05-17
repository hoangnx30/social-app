import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

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
  console.log(conversationId);
  useEffect(() => {
    firebase
      .database()
      .ref(`conversations/${conversationId}/messages`)
      .on('child_added', (snapshot) => setMessages((value) => GiftedChat.append(value, snapshot.val())));
  }, []);
  const onSend = (message) => {
    firebase.database().ref(`conversations/${conversationId}/messages`).push(message);
  };

  return (
    <View style={styles.screen}>
      <GiftedChat onSend={onSend} user={{ _id: currentUser.userId, name: currentUser.fullName }} messages={messages} />
    </View>
  );
};

export default MessageScreen;
