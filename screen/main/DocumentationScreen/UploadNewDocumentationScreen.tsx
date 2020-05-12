import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import Color from '../../../constants/Color';

const UploadNewDocumentationScreen = (props: any) => {
  const [nameFolder, setNameFolder] = useState<string>('');

  const onHandleCreateFolder = () => {
    const createAt = Date.now();
    firebase
      .database()
      .ref('documentation')
      .push({ nameFolder: nameFolder, createAt: createAt })
      .then(() => {
        setNameFolder('');
        props.navigation.navigate('ListFolderDocumentation');
      });
  };

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
            value={nameFolder}
            onChangeText={(text) => setNameFolder(text)}
          />
        </View>

        <TouchableOpacity
          style={nameFolder.length === 0 ? styles.wrapButtonDisabled : styles.wrapButton}
          activeOpacity={0.8}
          disabled={nameFolder.length === 0 ? true : false}
          onPress={onHandleCreateFolder}
        >
          <Text style={nameFolder.length === 0 ? styles.contentButtonDisabled : styles.contentButton}>
            Create Folder
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadNewDocumentationScreen;

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
