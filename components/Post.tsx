import React, { useState } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useTheme } from '@react-navigation/native';

import { CustomHeaderButtonMCI } from './HeaderButton';
import { HomeParamsList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { rootReducerType } from '../store/reducer';
import { updateListLikeAsync } from '../store/action/post.action';
interface Props {
  uidPost: string;
  username?: string;
  date?: string;
  content?: string;
  listLike?: Array<string>;
  listComment?: Array<string>;
  navigation: StackNavigationProp<HomeParamsList, 'Home'>;
  isComment?: boolean;
  owner?: string;
}

const Post: React.FC<Props> = ({
  uidPost,
  username,
  date,
  content,
  listLike,
  listComment,
  navigation,
  isComment,
  owner,
}) => {
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(listLike?.indexOf(userUid) < 0 ? false : true);
  const theme = useTheme();
  debugger;
  const dispatch = useDispatch();
  let timeOfPost;
  if (isComment) {
    timeOfPost = moment.duration(Date.now() - date)._data.minutes;
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setOnFocus(!onFocus)}
      onPressOut={() => setOnFocus(!onFocus)}
      onPress={() => {
        navigation.navigate('Post', {
          listComment: listComment,
          username: username,
          date: date,
          listLike: listLike,
          content: content,
        });
      }}
      style={{ backgroundColor: onFocus ? '#F5F5F5' : 'white' }}
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Avatar.Image source={require('../assets/avatar.png')} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.topContent}>
            <View style={{ flexShrink: 1, width: '100%' }}>
              <View style={styles.topLeftContainer}>
                <Text style={styles.username}>{username}</Text>
                {isComment && <Text style={{ marginRight: 3 }}>{timeOfPost === 0 ? '1' : timeOfPost} minutes ago</Text>}
              </View>
              {!isComment && <Text>{moment(date).calendar()}</Text>}
            </View>
            {owner === userUid ? (
              <View>
                <IconButton icon={() => <MaterialIcons name="keyboard-arrow-down" size={32} />} onPress={() => {}} />
              </View>
            ) : null}
          </View>

          <View>
            <View style={styles.mainContent}>
              <Text style={{ flexWrap: 'wrap' }}>{content}</Text>
            </View>
          </View>

          <View>
            <View style={styles.bottomContent}>
              <View style={styles.action}>
                <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
                  <Item
                    title="heart"
                    color={theme.colors.primary}
                    iconName={isLike ? 'heart' : 'heart-outline'}
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
                <Text style={styles.numberOfAction}>{listLike?.length}</Text>
              </View>

              <View style={styles.action}>
                <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
                  <Item
                    title="comment"
                    iconName="comment-outline"
                    color={theme.colors.primary}
                    onPress={() => {
                      navigation.navigate('Post', {
                        listComment: listComment,
                        username: username,
                        date: date,
                        listLike: listLike,
                        content: content,
                      });
                    }}
                  ></Item>
                </HeaderButtons>
                <Text style={styles.numberOfAction}>{listComment?.length}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mainContent: { marginVertical: 10 },
  bottomContent: { flexDirection: 'row' },
  leftContainer: { paddingHorizontal: 5, paddingVertical: 10 },
  rightContainer: { flexShrink: 1, padding: 5 },
  action: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  numberOfAction: { fontSize: 18, marginLeft: 4 },
  username: { fontSize: 18, fontWeight: 'bold', overflow: 'hidden' },
  topLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
