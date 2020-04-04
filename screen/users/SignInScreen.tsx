import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { AuthNavigatorProps } from '../../navigation/types';


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SignInScreen = ({ navigation }: AuthNavigatorProps<'SignIn'>) => {
  return (
    <View style={styles.screen}>
      <Text>SignInScreen</Text>
      <Button title="Forgot Password" onPress={() => navigation.navigate('ForgotPassword')} />
    </View>
  );
};

export default SignInScreen;
