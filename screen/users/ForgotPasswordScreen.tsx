import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';
import { useState } from 'react';
import { AuthNavigatorProps } from '../../navigation/types';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    marginVertical: 20,
    paddingVertical: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1DA1F2',
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

const ForgotPasswordScreen = ({ navigation }: AuthNavigatorProps<'ForgotPassword'>) => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.screen}>
      <Text style={styles.textmain}>
        You forgot your password? Please enter your email here. We will sent new password to you.
      </Text>
      <TextInput style={styles.inputmail} onChangeText={(email) => setEmail(email)} placeholder="Email" />
      <TouchableHighlight style={styles.submit} underlayColor="#fff">
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
