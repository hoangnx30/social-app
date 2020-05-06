import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import HeaderGroup from '../../../components/group/HeaderGroup';
import ButtonCircle from '../../../components/ButtonCircle';
import { ScrollView } from 'react-native-gesture-handler';
import Post from '../../../components/Post';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const GroupHomeScreen = ({ route, navigation }: any) => {
  const params = route.params;
  const group = useSelector((state) => state.groupState.group.find((item) => params.uid === item.id));
  const dataGroup = group ? group.ListPost : [];
  const data = [];
  const renderItem = ({ item }: any) => {
    return (
      <Post
        uidPost={item.id}
        username={item.username}
        date={item.timeUpload}
        listLike={item.listLike ? item.listLike : []}
        listComment={item.listComment}
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
            {data.length > 0 ? (
              <FlatList data={dataGroup} renderItem={renderItem} />
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
