import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import firebase from 'firebase';

import Comment from '../../../components/Comment';
import PostWithComment from '../../../components/PostWithComment';
import { useDispatch, useSelector } from 'react-redux';
import { rootReducerType } from '../../../store/reducer';
import CustomTextInput from '../../../components/CustomTextInput';

import { uploadComment } from '../../../services/service';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
});

const PostScreen = ({ route, navigation }: any) => {
  const authState = useSelector<rootReducerType>((state) => state.authState);
  const uidGroup = route && route.params ? route.params.uidGroup : undefined;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');
  const { content, date, listComment, listLike, user, uidPost, urlImage, isLike } = route.params;

  const [post, setPost] = useState({});

  if (!uidGroup) {
    const listPost = useSelector((state) => state.postState.postData);
    const currentPost = listPost.find((item) => item.id === uidPost);

    useEffect(() => {
      setPost(currentPost);
    }, [listPost, uidPost, listComment]);
  } else {
    const listPost = useSelector((state) => state.groupState.postDataGroup);
    const currentPost = listPost.find((item) => item.id === uidPost);

    useEffect(() => {
      setPost(currentPost);
    }, [listPost, uidPost, listComment, uidGroup]);
  }

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
            listLike={post && post.listLike ? post.listLike : []}
            user={user}
            uidPost={uidPost}
            uidGroup={uidGroup}
            urlImage={urlImage}
            isLike={post.isLike}
          />
          {post.listComment &&
            Object.keys(post.listComment).map((key: any, _: number) => {
              const item = post.listComment[key];

              if (item) {
                return (
                  <Comment
                    uidPost={uidPost}
                    uidComment={key}
                    key={key}
                    username={item.fullName}
                    timeUpload={item.timeUpload.toString()}
                    listLike={item.listLike ? item.listLike : []}
                    content={item.content}
                    navigation={navigation}
                    isComment={true}
                    owner={item.owner}
                    uidGroup={uidGroup}
                  />
                );
              }
            })}
        </ScrollView>
      </View>
      <CustomTextInput
        value={commentValue}
        onHandleChangeText={(value) => setCommentValue(value)}
        onHandleSubmit={() => {
          uploadComment(authState.userInfo.uid, uidPost, commentValue, authState.user.fullName, uidGroup);
          setCommentValue('');
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};

export default PostScreen;
