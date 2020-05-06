import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import HeaderGroup from '../../../components/group/HeaderGroup';
import ButtonCircle from '../../../components/ButtonCircle';
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../../../components/Post';
import { transformData } from '../../../store/action/group.action';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const GroupHomeScreen = ({ route, navigation }: any) => {
  const params = route.params;
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groupState.group.find((item) => params.uid === item.id));

  let dataGroup = group ? group.ListPost : {};

  useEffect(() => {
    dispatch(transformData(dataGroup));
  }, [dispatch]);
  const result = useSelector((state) => state.groupState.transformData);
  console.log('aaaaaa', result);
  const renderItem = ({ item }: any) => {
    console.log('=====', item);
    return (
      <Post
        uidPost={item.id}
        username={item.fullName}
        date={item.timeUpload}
        listLike={item.listLike ? item.listLike : []}
        listComment={item.listComment ? item.listComment : []}
        content={item.content}
        navigation={navigation}
        owner={item.owner}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <View style={{ borderWidth: 1, width: '100%', height: '100%' }}>
        <ScrollView>
          <View>
            <HeaderGroup name="This is a name 's group" members={['a', 'b', 'c', 'd']} />
          </View>
          <View>
            {result.length > 0 ? (
              <FlatList data={result} renderItem={renderItem} />
            ) : (
              <View style={{ alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 18 }}>No Post is available</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <ButtonCircle
        iconName="edit"
        typeIcon="MI"
        navigate={() => navigation.navigate('UpLoadPostGroup', { uidGroup: params.uid })}
      />
    </View>
  );
};

export default GroupHomeScreen;
