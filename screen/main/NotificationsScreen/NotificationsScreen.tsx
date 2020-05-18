import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, Vibration, Button } from 'react-native';

import { Notifications } from 'expo';
import Constant from 'expo-constants';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NotificationsScreen = () => {
  const [token, setToken] = useState<string>('');
  const [notification, setNotification] = useState({});


  const registerForPushNotificationAsync = async () => {
    if (Constant.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setToken(token);
    } else {
      Alert.alert('Must use physical device for Push Notification');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
    setNotification(notification);
  };

  let notificationSubcription;

  useEffect(() => {
    registerForPushNotificationAsync();
    notificationSubcription = Notifications.addListener(_handleNotification);
  }, []);

  const sendPushNotification = async () => {
    const message = {
      to: token,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body',
      data: { data: 'Goes here' },
      _displayInForeground: false,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  return (
<View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Origin: {notification.origin}</Text>
          <Text>Data: {JSON.stringify(notification.data)}</Text>
        </View>
        <Button title={'Press to Send Notification'} onPress={() => sendPushNotification()} />
      </View>
  );
};

export default NotificationsScreen;
