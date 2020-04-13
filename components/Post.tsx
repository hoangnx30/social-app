import React, { useState } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CustomHeaderButtonMCI } from './HeaderButton';
import { HomeParamsList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { rootReducerType } from '../store/reducer';

interface Props {
  username?: string;
  date?: string;
  content?: string;
  numberOfHeart?: number;
  numberOfComment?: number;
  navigation: StackNavigationProp<HomeParamsList, 'Home'>;
  isComment?: boolean;
  owner?: string;
}

const Post: React.FC<Props> = ({
  username,
  date,
  content,
  numberOfHeart,
  numberOfComment,
  navigation,
  isComment,
  owner,
}) => {
  const [onFocus, setOnFocus] = useState(false);
  let timeOfPost;
  if (isComment) {
    timeOfPost = moment.duration(Date.now() - date)._data.minutes;
  }
  const userUid = useSelector<rootReducerType>((state) => state.authState.userInfo.uid);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => setOnFocus(!onFocus)}
      onPressOut={() => setOnFocus(!onFocus)}
      onPress={() => {
        navigation.navigate('Post');
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
                  <Item title="heart" iconName="heart" onPress={() => {}}></Item>
                </HeaderButtons>
                <Text style={styles.numberOfAction}>{numberOfHeart}</Text>
              </View>

              <View style={styles.action}>
                <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
                  <Item title="comment" iconName="comment" onPress={() => {}}></Item>
                </HeaderButtons>
                <Text style={styles.numberOfAction}>{numberOfComment}</Text>
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
