import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Button, TextInput, CheckBox, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';

import { AuthNavigatorProps } from '../../navigation/types';
import { LoginAsync } from '../../store/action/auth.action';
import { rootReducerType } from '../../store/reducer';
import { UserInfo } from '../../store/action/types';

const SignInScreen = ({ navigation }: AuthNavigatorProps<'SignIn'>) => {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        },
        title: {
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 30,
          color: theme.colors.primary,
        },
        input: {
          width: '70%',
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary,
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
          backgroundColor: theme.colors.primary,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          width: '70%',
        },
        submitText: {
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 18,
        },
      }),
    []
  );

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
