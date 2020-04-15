import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

import Comment from '../../../components/Comment';
import PostWithComment from '../../../components/PostWithComment';
import { useDispatch, useSelector } from 'react-redux';
import { setListCommentDataAsync } from '../../../store/action/comment.action';
import { rootReducerType } from '../../../store/reducer';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PostScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const { content, date, listComment, listLike, username, uidPost } = route.params;

  const loadPostPage = useCallback(async () => {
    await dispatch(setListCommentDataAsync(listComment));
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadPostPage().then(setIsLoading(false));
  }, [dispatch, loadPostPage]);

  const listCommentData = useSelector<rootReducerType>((state) => state.commentState.listDataComment);
  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={{ flexShrink: 1 }}>
        <ScrollView>
          <PostWithComment
            content={content}
            timeUpload={date}
            listComment={listComment}
            listLike={listLike}
            username={username}
            uidPost={uidPost}
          />
          {listCommentData.map((item, _) => {
            return (
              <Comment
                key={item.id}
                username={item.fullname}
                timeUpload={item.timeUpload.toString()}
                listLike={item.listLike}
                content={item.content}
                navigation={navigation}
                isComment={true}
                owner={item.owner}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default PostScreen;
