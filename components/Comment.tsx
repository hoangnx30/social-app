import React, { useState } from 'react';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useTheme } from 'react-native-paper';

import { CustomHeaderButtonMCI } from './HeaderButton';
import { HomeParamsList } from '../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { rootReducerType } from '../store/reducer';
import { updateListLikeCommentAsync } from '../store/action/comment.action';

interface Props {
  username?: string;
  timeUpload?: string;
  content?: string;
  listLike?: Array<string> | [];
  numberOfComment?: Array<string> | [];
  navigation: StackNavigationProp<HomeParamsList, 'Home'>;
  isComment?: boolean;
  owner?: string;
  uidComment?: string;
}

const Comment: React.FC<Props> = ({
  username,
  timeUpload,
  uidComment,
  content,
  listLike,
  navigation,
  isComment,
  owner,
}) => {
  const [onFocus, setOnFocus] = useState(false);
  const [isLike, setIsLike] = useState<boolean>(listLike?.indexOf(userUid) < 0 ? false : true);

  const theme = useTheme();
  const dispatch = useDispatch();
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  let timeOfPost;
  if (isComment) {
    timeOfPost = moment.duration(Date.now() - timeUpload)._data.minutes;
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setOnFocus(!onFocus)}
      onPressOut={() => setOnFocus(!onFocus)}
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
                <Text style={{ marginRight: 3 }}>{timeOfPost === 0 ? '1' : timeOfPost} minutes ago</Text>
              </View>
            </View>
            {userUid === owner ? (
              <View>
                <IconButton icon={() => <MaterialIcons name="keyboard-arrow-down" size={32} />} onPress={() => {}} />
              </View>
            ) : null}
          </View>

          <View>
            <View>
              <Text style={{ flexWrap: 'wrap' }}>{content}</Text>
            </View>
          </View>

          <View>
            <View style={styles.bottomContent}>
              <View style={styles.action}>
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
                        dispatch(updateListLikeCommentAsync(uidComment, updateListLike));
                      } else {
                        listLike?.push(userUid);
                        setIsLike(!isLike);
                        if (listLike?.indexOf(userUid) >= 0) {
                          const updateListLike = listLike;
                          dispatch(updateListLikeCommentAsync(uidComment, updateListLike));
                          return;
                        }
                        const updateListLike = listLike?.concat(userUid);
                        dispatch(updateListLikeCommentAsync(uidComment, updateListLike));
                      }
                    }}
                  ></Item>
                </HeaderButtons>
                <Text style={styles.numberOfAction}>{listLike.length}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
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
