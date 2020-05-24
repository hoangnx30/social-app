import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import { createNewConversation } from '../../../services/service';
import { fetchAllUser } from '../../../store/action/message.action';
import { FETCH_USER } from '../../../store/action/actionTypes';
import { GiftedAvatar } from 'react-native-gifted-chat';

const CreateNewMessageScreen = ({ route, navigation }) => {
  const [fetchUser, setFetchUser] = useState([]);
  const [displayUser, setDisplayUser] = useState([]);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const allUser = useSelector((state) => state.messageState.users);

  const currentUser = useSelector((state) => state.authState.user);

  useEffect(() => {
    const result = allUser.filter((user) => user.MSSV !== currentUser.MSSV);
    setFetchUser(result);
    setDisplayUser(result);
  }, []);

  const renderItem = useCallback(({ item }) => {
    const user = {
      name: item.fullName,
      _id: item.userId,
      avartar: item.avatar
    }
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
          <GiftedAvatar
            user={user}
            avatarStyle={{ height: 50, width: 50, borderRadius: 25 }}
            textStyle={{ fontSize: 20 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 17 }}>{item.fullName}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }, []);

  const handleFilterUser = useCallback((text) => {
    if (text.length === 0) {
      const result = allUser.filter((user) => user.MSSV !== currentUser.MSSV);
      setFetchUser(result);
      return;
    }
    const data = fetchUser.filter(item => {
      return item.fullName.toLowerCase().includes(text.toLowerCase());
    })
    setDisplayUser(data);
  }, [value])

  return (
    <View style={styles.screen}>
      <View style={styles.wrapSearch}>
        <Text style={styles.text}>To: </Text>
        <TextInput style={styles.textInput} placeholder="Type a name" value={value} onChangeText={(text) => {
          handleFilterUser(text);
          setValue(text);
        }} />
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={displayUser}
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
