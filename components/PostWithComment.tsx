import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useTheme } from 'react-native-paper';

import { CustomHeaderButtonMCI } from './HeaderButton';
import { rootReducerType } from '../store/reducer';
import { likePost } from '../services/service';
import { fetchGroup } from '../store/action/group.action';
import { GiftedAvatar } from 'react-native-gifted-chat';

interface Props {
  uidPost?: string;
  username?: string;
  timeUpload?: string;
  content?: string;
  listLike?: Array<string> | [];
  listComment?: Array<string> | [];
  uidGroup?: string;
  inputRef?: any;
  user?: any
  isLike?: boolean;
  urlImage?: string;
}

const PostWithComment: React.FC<Props> = ({
  username,
  timeUpload,
  user,
  content,
  listComment,
  listLike,
  uidPost,
  uidGroup,
  urlImage,
  isLike
}) => {
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  // const [isLike, setIsLike] = useState<boolean>(listLike?.indexOf(userUid) < 0 ? false : true);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.headerPost}>
          <GiftedAvatar
            user={{ name: user.fullName, avatar: user.avatar }}
            avatarStyle={{ height: 50, width: 50, borderRadius: 25 }}
            textStyle={{ fontSize: 20 }}
          />
          <View style={{ marginLeft: 8 }}>
            <TouchableNativeFeedback>
              <View>
                <Text style={styles.username}>{user.fullName}</Text>
              </View>
            </TouchableNativeFeedback>
            <Text>{moment(timeUpload).calendar()}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text>{content}</Text>
        </View>

        {urlImage ? (
          <View style={{ marginBottom: 10 }}>
            <Image source={{ uri: urlImage }} style={{ width: '100%', height: 200 }} resizeMode="contain" />
          </View>
        ) : null}

        <View style={styles.slash}></View>
        <View style={styles.infoStatus}>
          <View style={styles.infoStatusItem}>
            <Text style={styles.infoStatusContent}>{listLike?.length}</Text>
            <Text>{listLike?.length > 1 ? 'Likes' : 'Like'} </Text>
          </View>

          <View style={styles.infoStatusItem}>
            <Text style={styles.infoStatusContent}>{Object.keys(listComment).length}</Text>
            <Text>{Object.keys(listComment).length > 1 ? 'Comments' : 'Comment'}</Text>
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
                if (uidGroup) {
                  if (isLike) {
                    const index = listLike?.indexOf(userUid);
                    listLike?.splice(index, 1);
                    const updateListLike = listLike?.filter((item) => item !== userUid);
                    // setIsLike(!isLike);
                    likePost(uidPost, updateListLike, uidGroup);
                    dispatch(fetchGroup());
                  } else {
                    listLike?.push(userUid);
                    // setIsLike(!isLike);
                    if (listLike?.indexOf(userUid) >= 0) {
                      const updateListLike = listLike;
                      likePost(uidPost, updateListLike, uidGroup);
                      dispatch(fetchGroup());
                      return;
                    }
                    const updateListLike = listLike?.concat(userUid);
                    likePost(uidPost, updateListLike, uidGroup);
                  }
                  return;
                }

                if (isLike) {
                  const updateListLike = listLike?.filter(id => id !== userUid);
                  likePost(uidPost, updateListLike);
                } else {
                  const updateListLike = [...listLike, userUid];
                  likePost(uidPost, updateListLike);
                }
              }}
            ></Item>
          </HeaderButtons>
          <View style={{ borderColor: '#ccc' }}></View>
          <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
            <Item title="comment" iconName="comment-outline" color={theme.colors.primary} onPress={() => { }}></Item>
          </HeaderButtons>
        </View>
        <View style={styles.slash}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
  },
  headerPost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
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
