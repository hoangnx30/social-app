import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  members: Array<string>;
}

const HeaderGroup = ({ name, members }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameGroup}>{name}</Text>
      <Text>{members.length}</Text>
    </View>
  );
};

export default HeaderGroup;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '20%',
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
  },
  nameGroup: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
