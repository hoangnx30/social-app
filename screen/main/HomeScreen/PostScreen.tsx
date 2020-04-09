import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

import Comment from '../../../components/Comment';
import PostWithComment from '../../../components/PostWithComment';

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

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
});

const PostScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <ScrollView>
        <PostWithComment />
        {mockdata.map((item, _) => {
          return (
            <Comment
              key={item.key}
              username={item.username}
              date={item.date.toString()}
              numberOfComment={item.numberOfComment}
              numberOfHeart={item.numberOfHeart}
              content={item.content}
              navigation={navigation}
              isComment={true}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PostScreen;
