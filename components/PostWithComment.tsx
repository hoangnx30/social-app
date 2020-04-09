import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Avatar } from 'react-native-paper';
import moment from 'moment';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CustomHeaderButtonMCI } from './HeaderButton';

const PostWithComment = () => {
  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.headerPost}>
          <Avatar.Image style={styles.avatar} source={require('../assets/avatar.png')} />
          <View>
            <TouchableNativeFeedback>
              <View>
                <Text style={styles.username}>username</Text>
              </View>
            </TouchableNativeFeedback>
            <Text>{moment(Date.now()).calendar()}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum
          </Text>
        </View>
        <View style={styles.slash}></View>
        <View style={styles.infoStatus}>
          <View style={styles.infoStatusItem}>
            <Text style={styles.infoStatusContent}>2</Text>
            <Text>Comment</Text>
          </View>

          <View style={styles.infoStatusItem}>
            <Text style={styles.infoStatusContent}>30</Text>
            <Text>Likes</Text>
          </View>
        </View>
        <View style={styles.slash}></View>
        <View style={styles.listIcon}>
          <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
            <Item title="heart" iconName="heart-outline" onPress={() => {}}></Item>
          </HeaderButtons>
          <View style={{ borderWidth: 1, borderColor: '#ccc' }}></View>
          <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
            <Item title="comment" iconName="comment-outline" onPress={() => {}}></Item>
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
