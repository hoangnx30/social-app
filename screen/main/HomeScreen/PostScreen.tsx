import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

import Comment from '../../../components/Comment';
import PostWithComment from '../../../components/PostWithComment';
import { useDispatch, useSelector } from 'react-redux';
import { setListCommentDataAsync, updateNewComment } from '../../../store/action/comment.action';
import { rootReducerType } from '../../../store/reducer';
import CustomTextInput from '../../../components/CustomTextInput';

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
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');
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
      <View style={{ flexShrink: 1, marginBottom: 52 }}>
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
                uidComment={item.id}
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
      <CustomTextInput
        value={commentValue}
        onHandleChangeText={(value) => setCommentValue(value)}
        onHandleSubmit={() => dispatch(updateNewComment(userUid, commentValue, uidPost))}
      />
    </View>
  );
};

export default PostScreen;
