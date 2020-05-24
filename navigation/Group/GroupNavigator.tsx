import React from 'react';
import { Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator } from '@react-navigation/stack';

import { GroupParamsList } from '../types';
import GroupScreen from '../../screen/main/GroupScreen/GroupScreen';
import GroupHomeScreen from '../../screen/main/GroupScreen/GroupHome';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';
import { CustomHeaderButtonMCI } from '../../components/HeaderButton';
import CreateGroupScreen from '../../screen/main/GroupScreen/CreateGroupScreen';
import UploadPostScreen from '../../screen/main/HomeScreen/UploadPostScreen';

const GroupStackNavigator = createStackNavigator<GroupParamsList>();

const GroupNavigator = () => {
  return (
    <GroupStackNavigator.Navigator>
      <GroupStackNavigator.Screen
        name="Group"
        component={GroupScreen}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
              <Item title="avatar" iconName="account-circle" />
            </HeaderButtons>
          ),
        }}
      />
      <GroupStackNavigator.Screen name="GroupHome" component={GroupHomeScreen} options={({ route, navigation }) => {
        return {
          headerTitle: route.params.title
        }
      }} />
      <GroupStackNavigator.Screen name="Post" component={PostScreen} />
      <GroupStackNavigator.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
        options={{ headerTitle: 'Create Group' }}
      />
      <GroupStackNavigator.Screen
        name="UpLoadPostGroup"
        component={UploadPostScreen}
        options={({ navigation, route }) => {
          return {
            headerTitle: 'Update Status',
          };
        }}
      />
    </GroupStackNavigator.Navigator>
  );
};

export default GroupNavigator;
