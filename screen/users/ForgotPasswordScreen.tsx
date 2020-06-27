import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import firebase from 'firebase';
import { AuthNavigatorProps } from '../../navigation/types';

const ForgotPasswordScreen = ({ navigation }: AuthNavigatorProps<'ForgotPassword'>) => {
  const theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      },
      submit: {
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        width: '70%',
      },
      submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
      },
      inputmail: {
        borderWidth: 1,
        paddingBottom: 7,
        paddingTop: 7,
        paddingLeft: 15,
        width: '70%',
      },
      textmain: {
        marginBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
      },
    });
  }, []);
  const [email, setEmail] = useState('');

  const handleResetPassword = useCallback(() => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Success',
          'Please check your email. We have sent to you a link for resetting password',
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log(firebase.auth().currentUser);
              },
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          'Failed',
          'Something went wrong. Please do it again',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          {
            cancelable: false,
          }
        );
      });
  }, [email]);

  return (
    <View style={styles.screen}>
      <Text style={styles.textmain}>
        You forgot your password? Please enter your email here. We will sent new password to you.
      </Text>
      <TextInput style={styles.inputmail} onChangeText={(email) => setEmail(email)} placeholder="Email" value={email} />
      <TouchableHighlight style={styles.submit} underlayColor="#fff" onPress={handleResetPassword}>
        <Text style={styles.submitText}>Sent Request</Text>
      </TouchableHighlight>
      <Text style={{ fontSize: 14 }}>
        Tap{' '}
        <Text style={{ fontWeight: 'bold', fontSize: 14 }} onPress={() => navigation.navigate('SignIn')}>
          HERE
        </Text>{' '}
        to come back log in screen
      </Text>
    </View>
  );
};

export default ForgotPasswordScreen;
