import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButtonMCI, CustomHeaderButtonMI } from './HeaderButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamsList } from '../navigation/types';

const styles = StyleSheet.create({
  screen: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  iconName: string;
  typeIcon: 'MCI' | 'MI';
  navigation: StackNavigationProp<HomeParamsList, 'UpLoadPost'>;
}

const ButtonCircle: React.FC<Props> = ({ iconName, typeIcon, navigation }) => {
  return (
    <View style={styles.screen}>
      <HeaderButtons HeaderButtonComponent={typeIcon === 'MCI' ? CustomHeaderButtonMCI : CustomHeaderButtonMI}>
        <Item
          title="comment"
          color="#1DA1F2"
          iconName={iconName}
          onPress={() => {
            navigation.navigate('UpLoadPost');
          }}
        ></Item>
      </HeaderButtons>
    </View>
  );
};

export default ButtonCircle;
