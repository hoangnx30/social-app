import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { DrawerParamsList } from '../types';
import InfoScreen from '../../screen/users/InfoScreen';
import SettingScreen from '../../screen/setting/SettingScreen';

const Drawer = createDrawerNavigator<DrawerParamsList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerIcon: () => <Ionicons name="ios-star" color="red" size={22} focus={false} /> }}
    >
      <Drawer.Screen name="InfoUser" component={InfoScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
