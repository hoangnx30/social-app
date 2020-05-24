import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';

import ButtonCircle from '../../../components/ButtonCircle';
import GroupItem from '../../../components/group/GroupItem';
import { useSelector, useDispatch } from 'react-redux';
import { rootReducerType } from '../../../store/reducer';
import { fetchGroup } from '../../../store/action/group.action';
import Color from '../../../constants/Color';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const GroupScreen = (props: any) => {
  const dispatch = useDispatch();
  // const [isRefreshing, setIsRefreshing] = useState(false);

  const [stateGroup, setStateGroup] = useState();
  useEffect(() => {
    dispatch(fetchGroup());
  }, [dispatch]);

  const renderItem = ({ item }: any) => {
    return <GroupItem createAt={item.createAt} navigation={props.navigation} name={item.nameGroup} uid={item.id} />;
  };

  const group = useSelector<rootReducerType>((state) => state.groupState.group);

  useEffect(() => {
    setStateGroup(group)
  }, [group])


  return (
    <View style={styles.screen}>
      <View>
        <FlatList renderItem={renderItem} showsVerticalScrollIndicator={false} data={stateGroup}
        // refreshControl={
        //   <RefreshControl refreshing={isRefreshing} colors={[Color.primary]} onRefresh={() => { dispatch(fetchGroup()); setIsRefreshing(false) }} />
        // } 
        />
      </View>
      <ButtonCircle navigate={() => props.navigation.navigate('CreateGroup')} typeIcon="MI" iconName="group-add" />
    </View>
  );
};

export default GroupScreen;
