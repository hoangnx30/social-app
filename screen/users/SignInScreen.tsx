import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, ActivityIndicator } from 'react-native-paper';

import { AuthNavigatorProps } from '../../navigation/types';
import { LoginAsync } from '../../store/action/auth.action';
import { rootReducerType } from '../../store/reducer';
import { UserInfo } from '../../store/action/types';
import { SET_ERROR_AUTH, SET_LOADING } from '../../store/action/actionTypes';
import Color from '../../constants/Color';

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

  const isLoading = useSelector((state) => state.authState.isLoading);
  const errorLogin = useSelector((state) => state.authState.error);

  if (errorLogin) {
    Alert.alert(
      'Sorry',
      'Email or password is wrong. Please do again.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            dispatch({
              type: SET_ERROR_AUTH,
              payload: {
                data: false,
              },
            });
          },
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch({
              type: SET_ERROR_AUTH,
              payload: {
                data: false,
              },
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  const handleLogIn = useCallback(() => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    dispatch(LoginAsync('xuanhoang30071999@gmail.com', 'Thangbandeu30@'));
    // dispatch(LoginAsync(email, password));
  }, [email, password]);

  const setEmailCB = useCallback((value) => {
    setEmail(value);
  }, []);

  const setPasswordCB = useCallback((value) => {
    setPassword(value);
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>SGUET</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmailCB} />
      <TextInput secureTextEntry={true} onChangeText={setPasswordCB} style={styles.input} placeholder="Password" />
      <TouchableOpacity style={styles.submit} onPress={handleLogIn} activeOpacity={0.8}>
        <Text style={styles.submitText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.forgotpass} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password?
      </Text>
      {isLoading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color={Color.primary} />
        </View>
      )}
    </View>
  );
};

export default SignInScreen;
