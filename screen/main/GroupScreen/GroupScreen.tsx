import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ButtonCircle from '../../../components/ButtonCircle';
import GroupItem from '../../../components/group/GroupItem';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const GroupScreen = (props: any) => {
  return (
    <View style={styles.screen}>
      <View>
        <GroupItem navigation={props.navigation} />
      </View>
      <ButtonCircle navigate={() => props.navigation.navigate('CreateGroup')} typeIcon="MI" iconName="group-add" />
    </View>
  );
};

export default GroupScreen;
