import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Folder from '../../../components/Folder'
import { DocumentationNavigatorProps } from '../../../navigation/types';
const styles = StyleSheet.create({
  
});

const ListFolderDocumentationScreen = ({ navigation }: DocumentationNavigatorProps<'ListFolderDocumentation'>) => {
  return (
    <Folder navigation={navigation}></Folder>
  );
};

export default ListFolderDocumentationScreen;
