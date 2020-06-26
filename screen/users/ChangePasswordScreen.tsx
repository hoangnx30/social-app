import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { ActivityIndicator } from 'react-native-paper';
import Color from '../../constants/Color';
const ChangePasswordScreen = ({ navigation }: any) => {
  let [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  userEmail = useSelector((state) => state.authState.user.email);

  useEffect(() => {
    if (userEmail !== '') {
      firebase
        .auth()
        .sendPasswordResetEmail(userEmail)
        .then(() => {
          setIsLoading(false);
          Alert.alert(
            'Success',
            'Email have been sent, Please click the link in your email and change your password!!',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  setUserEmail('');
                  navigation.goBack();
                },
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  setUserEmail('');
                  navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [userEmail]);
  console.log(userEmail);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <ActivityIndicator size="large" color={Color.primary} />}
    </View>
  );
};

export default ChangePasswordScreen;
