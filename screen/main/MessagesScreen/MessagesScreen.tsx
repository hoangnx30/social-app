import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ButtonCircle from '../../../components/ButtonCircle';
import { fetchAllUser, fetchConversations } from '../../../store/action/message.action';
import ConversationItem from '../../../components/ConversationItem';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '97%',
    paddingTop: 10,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
});

const MessagesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authState.user);
  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchConversations(user.conversations, user.userId));
  }, [dispatch]);

  const lastMessages = useSelector((state) => state.messageState.lastMessages);
  return (
    <View style={styles.screen}>
      {lastMessages.length > 0 ? (
        lastMessages.map((lastMessage) => {
          return (
            <ConversationItem
              user={lastMessage.user}
              lastMessageInfo={lastMessage.lastMessagesInfo}
              key={lastMessage.conversationId}
              conversationId={lastMessage.conversationId}
              navigation={navigation}
            />
          );
        })
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No message</Text>
        </View>
      )}
      <ButtonCircle iconName="message-plus" typeIcon="MCI" navigate={() => navigation.navigate('NewMessage')} />
    </View>
  );
};

export default MessagesScreen;
