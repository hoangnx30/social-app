import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PostScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const authState = useSelector<rootReducerType>((state) => state.authState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');
  const { content, date, listComment, listLike, username, uidPost } = route.params;
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
          {Object.keys(listComment).map((key: any, _: number) => {
            const item = listComment[key];
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
              />
            );
          })}
        </ScrollView>
      </View>
      <CustomTextInput
        value={commentValue}
        onHandleChangeText={(value) => setCommentValue(value)}
        onHandleSubmit={() => {
          uploadComment(authState.userInfo.uid, uidPost, commentValue, authState.user.fullName);
          setCommentValue('');
          Keyboard.dismiss();
        }}
      />
    </View>
  );
};

export default PostScreen;
