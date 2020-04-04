import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GroupParamsList } from '../types';
import GroupScreen from '../../screen/main/GroupScreen/GroupScreen';
import GroupHomeScreen from '../../screen/main/GroupScreen/GroupHome';
import PostScreen from '../../screen/main/HomeScreen/PostScreen';

const GroupStackNavigator = createStackNavigator<GroupParamsList>();

const GroupNavigator = () => {
  return (
    <GroupStackNavigator.Navigator>
      <GroupStackNavigator.Screen name="Group" component={GroupScreen} />
      <GroupStackNavigator.Screen name="GroupHome" component={GroupHomeScreen} />
      <GroupStackNavigator.Screen name="Post" component={PostScreen} />
    </GroupStackNavigator.Navigator>
  );
};

export default GroupNavigator;
