import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../../../components/Post';
import ButtonCircle from '../../../components/ButtonCircle';
import { rootReducerType } from '../../../store/reducer/';
import { setPostDataAsync } from '../../../store/action/post.action';

const HomeScreen = ({ navigation }: any) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loadHomePage = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(setPostDataAsync());
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setIsRefreshing]);

  useEffect(() => {
    setIsLoading(true);
    loadHomePage().then(setIsLoading(false));
  }, [dispatch, loadHomePage]);
  const renderItem = ({ item }: any) => {
    return (
      <Post
        username={item.username}
        date={item.timeUpload}
        numberOfComment={item.listComment.length}
        numberOfHeart={item.listLike.length}
        content={item.content}
        navigation={navigation}
        owner={item.owner}
      />
    );
  };

  const postDataFetch: any = useSelector<rootReducerType>((state) => state.postState.postData);

  return (
    <React.Fragment>
      {postDataFetch.length == 0 ? (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color="#aec65a" />
        </View>
      ) : (
        <View>
          <FlatList style={styles.listPost} data={postDataFetch} renderItem={renderItem} />
          <ButtonCircle iconName="edit" typeIcon="MI" navigation={navigation} />
        </View>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1000,
    alignItems: 'center',
  },
  listPost: {
    backgroundColor: 'white',
  },
});
