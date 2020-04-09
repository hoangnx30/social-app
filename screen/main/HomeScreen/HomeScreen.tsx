import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Post from '../../../components/PostAndComment';
import ButtonCircle from '../../../components/ButtonCircle';

type Item = {
  key: string;
  username: string;
  date: string;
  content: string;
  numberOfHeart: number;
  numberOfComment: number;
};

const mockdata = [
  {
    key: 'key1',
    username: 'username1',
    date: Date.now(),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    numberOfHeart: 32,
    numberOfComment: 37,
  },
  {
    key: 'key2',
    username: 'username1',
    date: Date.now(),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    numberOfHeart: 32,
    numberOfComment: 37,
  },
  {
    key: 'key3',
    username: 'username1',
    date: Date.now(),
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    numberOfHeart: 32,
    numberOfComment: 37,
  },
];

const HomeScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <Post
        username={item.username}
        date={item.date}
        numberOfComment={item.numberOfComment}
        numberOfHeart={item.numberOfHeart}
        content={item.content}
        navigation={navigation}
      />
    );
  };

  return (
    <React.Fragment>
      <FlatList
        style={styles.listPost}
        data={mockdata}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return item.key;
        }}
      />
      <ButtonCircle iconName="edit" typeIcon="MI" navigation={navigation} />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listPost: {
    backgroundColor: 'white',
  },
});
