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
import { likeComment } from '../services/service';
import { GiftedAvatar } from 'react-native-gifted-chat';

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
  uidPost?: string;
  user?: any
}

const Comment: React.FC<Props> = ({
  username,
  timeUpload,
  uidComment,
  content,
  listLike,
  user,
  navigation,
  isComment,
  owner,
  uidPost,
}) => {
  const [onFocus, setOnFocus] = useState(false);
  const [isLike, setIsLike] = useState<boolean>(listLike?.indexOf(userUid) < 0 ? false : true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  let timeOfPost = [
    new Date(+timeUpload).getFullYear(),
    new Date(+timeUpload).getMonth() + 1 < 10
      ? '0' + (new Date(+timeUpload).getMonth() + 1)
      : new Date(+timeUpload).getMonth() + 1,
    new Date(+timeUpload).getDate(),
  ].join('');
  if (isComment) {
    timeOfPost = moment(timeOfPost, 'YYYYMMDD').fromNow();
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
          <GiftedAvatar
            user={{ name: username }}
            avatarStyle={{ height: 50, width: 50, borderRadius: 25 }}
            textStyle={{ fontSize: 20 }}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.topContent}>
            <View style={{ flexShrink: 1 }}>
              <View style={styles.topLeftContainer}>
                <Text style={styles.username}>{username}</Text>
              </View>
            </View>
            {userUid === owner ? (
              <View style={{ justifyContent: 'flex-end' }}>
                <IconButton icon={() => <MaterialIcons name="keyboard-arrow-down" size={32} />} onPress={() => { }} />
              </View>
            ) : null}
          </View>
          <View>
            <Text style={{ marginTop: -10, marginBottom: 10, color: '#ccc' }}>{timeOfPost}</Text>
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
                        likeComment(uidPost, uidComment, updateListLike);
                      } else {
                        listLike?.push(userUid);
                        setIsLike(!isLike);
                        if (listLike?.indexOf(userUid) >= 0) {
                          const updateListLike = listLike;
                          likeComment(uidPost, uidComment, updateListLike);
                          return;
                        }
                        const updateListLike = listLike?.concat(userUid);
                        likeComment(uidPost, uidComment, updateListLike);
                      }
                    }}
                  ></Item>
                </HeaderButtons>
                <Text style={styles.numberOfAction}>{listLike ? listLike.length : 0}</Text>
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
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContent: { flexDirection: 'row' },
  leftContainer: { paddingHorizontal: 5, paddingVertical: 10 },
  rightContainer: { flexShrink: 0, padding: 5, flex: 1 },
  action: { flexDirection: 'row', alignItems: 'center', marginRight: 20, marginTop: 10 },
  numberOfAction: { fontSize: 18, marginLeft: 4 },
  username: { fontSize: 18, fontWeight: 'bold', overflow: 'hidden' },
  topLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
