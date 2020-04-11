import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, CheckBox, TouchableHighlight } from 'react-native';

import { AuthNavigatorProps } from '../../navigation/types';
import { useState } from 'react';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 30,
  },
  forgotpass: {
    color: '#000',
    fontSize: 12,
  },

  submit: {
    marginTop: 30,
    marginBottom:20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#000',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
});

const SignInScreen = ({ navigation }: AuthNavigatorProps<'SignIn'>) => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>SGUET</Text>
      <TextInput style={styles.input} placeholder="USER NAME" onChangeText={(user) => setUserName(user)} />
      <TextInput
        secureTextEntry={true}
        onChangeText={(pass) => setPassword(pass)}
        style={styles.input}
        placeholder="PASSWORD"
      />
      <TouchableHighlight style={styles.submit} underlayColor="#fff">
        <Text style={styles.submitText}>Login</Text>
      </TouchableHighlight>

      <Text style={styles.forgotpass} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default SignInScreen;
