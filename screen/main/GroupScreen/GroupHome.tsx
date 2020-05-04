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
  // const data = useSelector((state) => state.groupState.group.filter((item) => params.uid === item.uid));
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
          <View>{data.length > 0 ? <FlatList data={[]} renderItem={renderItem} /> : <Text>No Post</Text>}</View>
        </ScrollView>
      </View>
      <ButtonCircle iconName="edit" typeIcon="MI" navigate={() => props.navigation.navigate('UpLoadPost')} />
    </View>
  );
};

export default GroupHomeScreen;
