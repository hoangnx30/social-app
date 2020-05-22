import React, { useState } from 'react';
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

interface Props {
  uidPost?: string;
  username?: string;
  timeUpload?: string;
  content?: string;
  listLike?: Array<string> | [];
  listComment?: Array<string> | [];
  uidGroup?: string;
  inputRef?: any;
  urlImage?: string;
}

const PostWithComment: React.FC<Props> = ({
  username,
  timeUpload,
  content,
  listComment,
  listLike,
  uidPost,
  uidGroup,
  inputRef,
  urlImage,
}) => {
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  const [isLike, setIsLike] = useState<boolean>(listLike?.indexOf(userUid) < 0 ? false : true);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.headerPost}>
          <Avatar.Image style={styles.avatar} source={require('../assets/avatar.png')} size={55} />
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

        {urlImage ? (
          <View style={{ width: '100%' }}>
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
                  const index = listLike?.indexOf(userUid);
                  listLike?.splice(index, 1);
                  const updateListLike = listLike?.filter((item) => item !== userUid);
                  // setIsLike(!isLike);
                  likePost(uidPost, updateListLike);
                } else {
                  listLike?.push(userUid);
                  // setIsLike(!isLike);
                  if (listLike?.indexOf(userUid) >= 0) {
                    const updateListLike = listLike;
                    likePost(uidPost, updateListLike);

                    return;
                  }
                  const updateListLike = listLike?.concat(userUid);
                  likePost(uidPost, updateListLike);
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
    width: '100%',
    borderWidth: 1,
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
