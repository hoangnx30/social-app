import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import Avatar from '../../../components/Avatar';
import { createNewConversation } from '../../../services/service';
import { fetchAllUser } from '../../../store/action/message.action';
import { FETCH_USER } from '../../../store/action/actionTypes';

const CreateNewMessageScreen = ({ route, navigation }) => {
  const [fetchUser, setFetchUser] = useState([]);
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.messageState.users);

  const currentUser = useSelector((state) => state.authState.user);

  useEffect(() => {
    const result = allUser.filter((user) => user.MSSV !== currentUser.MSSV);
    setFetchUser(result);
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableNativeFeedback
        onPress={async () => {
          createNewConversation(currentUser.conversations, item.conversations, currentUser.userId, item.userId).then(
            (conversationId) => {
              dispatch(fetchAllUser());
              firebase
                .database()
                .ref(`users/${currentUser.userId}`)
                .once('value')
                .then((snapshot) => {
                  const value = snapshot.val();
                  const data = {
                    ...value,
                    userId: snapshot.key,
                  };
                  dispatch({
                    type: FETCH_USER,
                    payload: {
                      data: data,
                    },
                  });
                });

              navigation.replace('Message', {
                headerTitle: item.fullName,
                user: currentUser,
                conversationId: conversationId,
              });
            }
          );
        }}
      >
        <View style={styles.item}>
          <Avatar uri={item.avatar} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>{item.fullName}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.wrapSearch}>
        <Text style={styles.text}>To: </Text>
        <TextInput style={styles.textInput} placeholder="Type a name" />
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={fetchUser}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.userId;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
  },
  wrapSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginRight: 5,
  },
  textInput: {
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
export default CreateNewMessageScreen;
