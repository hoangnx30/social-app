import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { DrawerParamsList } from '../types';
import InfoScreen from '../../screen/users/InfoScreen';
import SettingScreen from '../../screen/setting/SettingScreen';
import BottomNavigator from '../BottomNavigator/BottomNavigator';

const Drawer = createDrawerNavigator<DrawerParamsList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="BottomTab" component={BottomNavigator} options={{ drawerLabel: 'Home' }} />
      <Drawer.Screen name="InfoUser" component={InfoScreen} options={{}} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
