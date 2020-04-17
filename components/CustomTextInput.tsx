import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useTheme } from 'react-native-paper';

import { CustomHeaderButtonMCI } from '../components/HeaderButton';

interface Props {
  value?: string;
  onHandleChangeText: (value: string) => void;
  onHandleSubmit: () => void;
}

const CustomTextInput: React.FC<Props> = ({ value, onHandleChangeText, onHandleSubmit }) => {
  const theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
      customTextInput: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
      },
      textInput: {
        marginLeft: 10,
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
      },
    });
  }, []);
  const [text, setText] = useState<string>('');
  return (
    <View style={styles.customTextInput}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Relpy"
        value={value}
        onChangeText={onHandleChangeText}
      />
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
        <Item title="heart" iconName="send" color={theme.colors.primary} onPress={onHandleSubmit}></Item>
      </HeaderButtons>
    </View>
  );
};

export default CustomTextInput;
