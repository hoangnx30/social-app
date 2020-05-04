import React, { useState, useCallback } from 'react';
import firebase from 'firebase';
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Color from '../../../constants/Color';
import { rootReducerType } from '../../../store/reducer';

const CreateGroupScreen = (props: any) => {
  const dispatch = useDispatch();
  const [nameGroup, setNameGroup] = useState<string>('');
  const authState = useSelector<rootReducerType>((state) => state.authState);

  const onHandleCreateGroup = useCallback(() => {
    firebase
      .database()
      .ref('group')
      .push({ members: [authState.userInfo.uid], nameGroup: nameGroup, createAt: Date.now().toString() })
      .then((value) => {
        props.navigation.replace('GroupHome', { id: value.key });
      });
  }, [dispatch, nameGroup]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.wrapTitle}>
          <Text style={styles.title}>Name</Text>
        </View>

        <View style={styles.wrapInput}>
          <TextInput
            autoCapitalize="sentences"
            autoCorrect={false}
            style={{ fontSize: 18 }}
            value={nameGroup}
            onChangeText={(text) => setNameGroup(text)}
          />
        </View>

        <TouchableOpacity
          style={nameGroup.length === 0 ? styles.wrapButtonDisabled : styles.wrapButton}
          activeOpacity={0.8}
          disabled={nameGroup.length === 0 ? true : false}
          onPress={onHandleCreateGroup}
        >
          <Text style={nameGroup.length === 0 ? styles.contentButtonDisabled : styles.contentButton}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  content: {
    width: '90%',
    alignSelf: 'center',
    height: '100%',
  },
  wrapInput: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  wrapTitle: {
    marginBottom: 10,
  },
  wrapButton: {
    borderWidth: 1,
    borderColor: Color.primary,
    backgroundColor: Color.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  wrapButtonDisabled: {
    borderWidth: 1,
    borderColor: Color.disabled,
    backgroundColor: Color.disabled,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },

  contentButton: { fontSize: 18, color: '#ffffff', fontWeight: 'bold' },
  contentButtonDisabled: { fontSize: 18, color: '#aaaaaa', fontWeight: 'bold' },
});
