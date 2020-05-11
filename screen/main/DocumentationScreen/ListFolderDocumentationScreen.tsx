import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ButtonCirlce from '../../../components/ButtonCircle';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ListFolderDocumentationScreen = (props: any) => {
  return (
    <View style={styles.screen}>
      <Text>ListFolderDocumentationScreen</Text>
      <ButtonCirlce typeIcon="MI" iconName="create-new-folder" navigate={() => props.navigation.navigate('UploadNewDocumentation')}/>
    </View>
  );
};

export default ListFolderDocumentationScreen;
