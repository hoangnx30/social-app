import React, { useMemo } from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { DrawerParamsList } from '../types';
import InfoScreen from '../../screen/users/InfoScreen';
import SettingScreen from '../../screen/setting/SettingScreen';
import BottomNavigator from '../BottomNavigator/BottomNavigator';

const Drawer = createDrawerNavigator<DrawerParamsList>();

const DrawerNavigator = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        logoutWapper: {
          marginHorizontal: '3%',
          borderWidth: 1,
          borderColor: 'black',
        },
        logoutContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        },
        container: {
          marginTop: '10%',
        },
        icon: {
          marginRight: '5%',
        },
        profile: {
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
      }),
    []
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
              <SafeAreaView>
                <TouchableOpacity>
                  <View style={styles.profile}>
                    <View style={styles.icon}>
                      <Avatar.Icon icon="account-circle" size={70} style={{ backgroundColor: 'white' }} />
                    </View>
                    <View>
                      <Text>Nguyen Xuan Hoang</Text>
                      <Text>17020772</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <DrawerItemList {...props} />

                <View style={styles.logoutWapper}>
                  <TouchableNativeFeedback style={{ flex: 1 }}>
                    <View style={styles.logoutContainer}>
                      <MaterialCommunityIcons name="logout" size={32} />
                      <Text>Logout</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </SafeAreaView>
            </ScrollView>
          </View>
        );
      }}
      drawerStyle={{}}
      drawerContentOptions={{ style: {} }}
    >
      <Drawer.Screen
        name="BottomTab"
        component={BottomNavigator}
        options={{ drawerLabel: 'Home', drawerIcon: () => <MaterialCommunityIcons name="home" size={32} /> }}
      />

      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerIcon: () => <MaterialIcons name="settings" size={32} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
