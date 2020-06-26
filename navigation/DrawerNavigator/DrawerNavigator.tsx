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
import { useSelector } from 'react-redux';
import { GiftedAvatar } from 'react-native-gifted-chat';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { DrawerParamsList } from '../types';
import InfoScreen from '../../screen/users/InfoScreen';
import SettingScreen from '../../screen/setting/SettingScreen';
import BottomNavigator from '../BottomNavigator/BottomNavigator';
import LogOutScreen from '../../screen/users/LogoutScreen';
import ChangePasswordScreen from '../../screen/users/ChangePasswordScreen';

const Drawer = createDrawerNavigator<DrawerParamsList>();

const DrawerNavigator = () => {
  const user = useSelector((state) => state.authState.user);
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
          marginTop: '20%',
        },
        icon: {
          marginRight: '5%',
        },
        profile: {
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
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
                      <GiftedAvatar
                        user={{ name: user.fullName, avatar: user.avatar }}
                        avatarStyle={{ height: 50, width: 50, borderRadius: 25 }}
                        textStyle={{ fontSize: 20 }}
                      />
                    </View>
                    <View>
                      <Text>Nguyen Xuan Hoang</Text>
                      <Text>17020772</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <DrawerItemList {...props} />

                {/* <View style={styles.logoutWapper}>
                  <TouchableNativeFeedback style={{ flex: 1 }}>
                    <View style={styles.logoutContainer}>
                      <MaterialCommunityIcons name="logout" size={32} />
                      <Text>Logout</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View> */}
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
        name="UpdateAvatar"
        component={SettingScreen}
        options={{
          drawerIcon: () => <MaterialCommunityIcons name="camera" size={32} />,
          drawerLabel: 'Update Avatar',
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          drawerIcon: () => <MaterialCommunityIcons name="key-change" size={32} />,
          drawerLabel: 'Change Password',
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOutScreen}
        options={{
          drawerIcon: () => <MaterialCommunityIcons name="logout" size={32} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
