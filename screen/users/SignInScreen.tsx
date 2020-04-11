import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, CheckBox, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AuthNavigatorProps } from '../../navigation/types';
import { LoginAsync } from '../../store/action/auth.action';
import { rootReducerType } from '../../store/reducer';
import { UserInfo } from '../../store/action/types';

const SignInScreen = ({ navigation }: AuthNavigatorProps<'SignIn'>) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  console.log(email, password);
  const dispatch = useDispatch();
  const handleLogIn = useCallback(() => {
    dispatch(LoginAsync('xuanhoang30071999@gmail.com', 'Thangbandeu30@'));
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>SGUET</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => setEmail(email.toString().trim())} />
      <TextInput
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password.trim())}
        style={styles.input}
        placeholder="Password"
      />
      <TouchableHighlight style={styles.submit} onPress={handleLogIn}>
        <Text style={styles.submitText}>Login</Text>
      </TouchableHighlight>

      <Text style={styles.forgotpass} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default SignInScreen;

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
    color: '#1DA1F2',
  },
  input: {
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#1DA1F2',
    marginBottom: 30,
  },
  forgotpass: {
    color: '#000',
    fontSize: 14,
  },

  submit: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1DA1F2',
    width: '70%',
  },
  submitText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
  },
});
