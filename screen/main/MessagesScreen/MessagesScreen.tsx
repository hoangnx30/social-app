import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import ButtonCircle from '../../../components/ButtonCircle';
import { fetchAllUser } from '../../../store/action/message.action';
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

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ConversationItem user={{}} />
      <ConversationItem user={{}} />
      <ConversationItem user={{}} />
      <ConversationItem user={{}} />
      <ButtonCircle iconName="message-plus" typeIcon="MCI" navigate={() => navigation.navigate('NewMessage')} />
    </View>
  );
};

export default MessagesScreen;
