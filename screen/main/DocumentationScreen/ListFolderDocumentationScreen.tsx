import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ButtonCircle from '../../../components/ButtonCircle';
import FolderItem from '../../../components/documentation/FolderItem';
import { loadDocumentation } from '../../../store/action/documentation.action';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const ListFolderDocumentationScreen = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDocumentation());
  }, []);

  const listFolder = useSelector((state) => state.documentationState.listFolder);
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <FolderItem
          nameFolder={item.nameFolder}
          createAt={item.createAt}
          navigation={props.navigation}
          uidFolder={item.id}
        />
      );
    },
    [listFolder]
  );

  return (
    <View style={styles.screen}>
      {listFolder && listFolder.length === 0 && (
        <View>
          <Text>No folder existed</Text>
        </View>
      )}
      <FlatList data={listFolder} renderItem={renderItem} />
      <ButtonCircle
        typeIcon="MI"
        iconName="create-new-folder"
        navigate={() => props.navigation.navigate('UploadNewDocumentation')}
      />
    </View>
  );
};

export default ListFolderDocumentationScreen;
