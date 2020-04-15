import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useTheme } from 'react-native-paper';

import { CustomHeaderButtonMCI } from './HeaderButton';
import { rootReducerType } from '../store/reducer';
import { updateListLikeAsync } from '../store/action/post.action';

interface Props {
  uidPost?: string;
  username?: string;
  timeUpload?: string;
  content?: string;
  listLike?: Array<string> | [];
  listComment?: Array<string> | [];
}

const PostWithComment: React.FC<Props> = ({ username, timeUpload, content, listComment, listLike, uidPost }) => {
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  const [isLike, setIsLike] = useState<boolean>(listLike?.indexOf(userUid) < 0 ? false : true);
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.headerPost}>
          <Avatar.Image style={styles.avatar} source={require('../assets/avatar.png')} />
          <View>
            <TouchableNativeFeedback>
              <View>
                <Text style={styles.username}>{username}</Text>
              </View>
            </TouchableNativeFeedback>
            <Text>{moment(timeUpload).calendar()}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
        <View style={styles.slash}></View>
        <View style={styles.infoStatus}>
          <View style={styles.infoStatusItem}>
            <Text style={styles.infoStatusContent}>{listLike?.length}</Text>
            <Text>{listLike?.length > 1 ? 'Likes' : 'Like'} </Text>
          </View>

          <View style={styles.infoStatusItem}>
            <Text style={styles.infoStatusContent}>{listComment?.length}</Text>
            <Text>{listComment?.length > 1 ? 'Comments' : 'Comment'}</Text>
          </View>
        </View>
        <View style={styles.slash}></View>
        <View style={styles.listIcon}>
          <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
            <Item
              title="heart"
              iconName={isLike ? 'heart' : 'heart-outline'}
              color={theme.colors.primary}
              onPress={() => {
                if (isLike) {
                  const index = listLike?.indexOf(userUid);
                  listLike?.splice(index, 1);
                  const updateListLike = listLike?.filter((item) => item !== userUid);
                  setIsLike(!isLike);
                  dispatch(updateListLikeAsync(uidPost, updateListLike));
                } else {
                  listLike?.push(userUid);
                  setIsLike(!isLike);
                  if (listLike?.indexOf(userUid) >= 0) {
                    const updateListLike = listLike;
                    dispatch(updateListLikeAsync(uidPost, updateListLike));
                    return;
                  }
                  const updateListLike = listLike?.concat(userUid);
                  dispatch(updateListLikeAsync(uidPost, updateListLike));
                }
              }}
            ></Item>
          </HeaderButtons>
          <View style={{ borderWidth: 1, borderColor: '#ccc' }}></View>
          <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
            <Item title="comment" iconName="comment-outline" color={theme.colors.primary} onPress={() => {}}></Item>
          </HeaderButtons>
        </View>
        <View style={styles.slash}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerPost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  slash: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  infoStatus: {
    flexDirection: 'row',
  },
  infoStatusItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  infoStatusContent: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  listIcon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
});
export default PostWithComment;
