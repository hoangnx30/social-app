import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import ButtonCircle from '../../../components/ButtonCircle';
import { fetchAllUser } from '../../../store/action/message.action';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
      <Text>MessagesScreen</Text>
      <ButtonCircle iconName="message-plus" typeIcon="MCI" navigate={() => navigation.navigate('NewMessage')} />
    </View>
  );
};

export default MessagesScreen;
