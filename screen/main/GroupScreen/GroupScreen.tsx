import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import ButtonCircle from '../../../components/ButtonCircle';
import GroupItem from '../../../components/group/GroupItem';
import { useSelector, useDispatch } from 'react-redux';
import { rootReducerType } from '../../../store/reducer';
import { fetchGroup } from '../../../store/action/group.action';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const GroupScreen = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroup());
  }, [dispatch]);

  const renderItem = ({ item }: any) => {
    return <GroupItem createAt={item.createAt} navigation={props.navigation} name={item.name} uid={item.uid} />;
  };

  const group = useSelector<rootReducerType>((state) => state.groupState.group);
  console.log('=============', group);
  return (
    <View style={styles.screen}>
      <View>
        <GroupItem navigation={props.navigation} />
        <FlatList renderItem={renderItem} showsVerticalScrollIndicator={false} data={group} />
      </View>
      <ButtonCircle navigate={() => props.navigation.navigate('CreateGroup')} typeIcon="MI" iconName="group-add" />
    </View>
  );
};

export default GroupScreen;
