import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { DocumentationParamsList } from '../types';
import ListFolderDocumentationScreen from '../../screen/main/DocumentationScreen/ListFolderDocumentationScreen';
import UploadNewDocumentationScreen from '../../screen/main/DocumentationScreen/UploadNewDocumentationScreen';
import ListDocumentationScreen from '../../screen/main/DocumentationScreen/ListDocumentationScreen';
import { CustomHeaderButtonMCI } from '../../components/HeaderButton';

const DocumentationStackNavigator = createStackNavigator<DocumentationParamsList>();

const DocumentationNavigator = () => {
  return (
    <DocumentationStackNavigator.Navigator>
      <DocumentationStackNavigator.Screen
        name="ListFolderDocumentation"
        component={ListFolderDocumentationScreen}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
              <Item title="avatar" iconName="account-circle" />
            </HeaderButtons>
          ),
          headerTitle: 'Documentation',
        }}
      />
      <DocumentationStackNavigator.Screen name="ListDocumentation" component={ListDocumentationScreen} />
      <DocumentationStackNavigator.Screen name="UploadNewDocumentation" component={UploadNewDocumentationScreen} />
    </DocumentationStackNavigator.Navigator>
  );
};

export default DocumentationNavigator;
