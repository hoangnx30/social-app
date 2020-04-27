import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createStackNavigator } from '@react-navigation/stack';

import { GroupParamsList } from '../types';
import GroupScreen from '../../screen/main/GroupScreen/GroupScreen';
import GroupHomeScreen from '../../screen/main/GroupScreen/GroupHome';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';
import { CustomHeaderButtonMCI } from '../../components/HeaderButton';
import CreateGroupScreen from '../../screen/main/GroupScreen/CreateGroupScreen';

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
      <GroupStackNavigator.Screen name="GroupHome" component={GroupHomeScreen} />
      <GroupStackNavigator.Screen name="Post" component={PostScreen} />
      <GroupStackNavigator.Screen name="CreateGroup" component={CreateGroupScreen} />
    </GroupStackNavigator.Navigator>
  );
};

export default GroupNavigator;
