import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#07ef16',
    accent: '#ffffff',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
