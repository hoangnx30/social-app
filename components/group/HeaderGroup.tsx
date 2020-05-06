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
      <Text style={styles.members}>{`${members.length} ${members.length > 1 ? 'members' : 'member'}`} </Text>
    </View>
  );
};

// Test
export default HeaderGroup;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nameGroup: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  },
  members: {
    fontSize: 16,
    color: '#aaaaaa',
    padding: 5,
    textAlign: 'center'
  }
});
