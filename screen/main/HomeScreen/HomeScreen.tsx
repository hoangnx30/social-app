import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../../../components/Post';
import ButtonCircle from '../../../components/ButtonCircle';
import { rootReducerType } from '../../../store/reducer/';
import { setPostDataAsync } from '../../../store/action/post.action';
import { HomeNavigatorProps } from '../../../navigation/types';
import Color from '../../../constants/Color';
import Modal from '../../../components/Modal';
import { fetchConversations } from '../../../store/action/message.action';

const HomeScreen = ({ navigation }: HomeNavigatorProps<'Home'>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authState.user);

  const loadHomePage = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(setPostDataAsync());
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setIsRefreshing]);

  useEffect(() => {
    setIsLoading(true);
    loadHomePage().then(setIsLoading(false));
    dispatch(fetchConversations(user.conversations, user.userId));
  }, [dispatch, loadHomePage]);
  const renderItem = ({ item }: any) => {
    return (
      <Post
        uidPost={item.id}
        user={item.user}
        date={item.timeUpload}
        listLike={item.listLike ? item.listLike : []}
        listComment={item.listComment}
        content={item.content}
        navigation={navigation}
        owner={item.owner}
        isVisible={isVisible}
        urlImage={item.urlImage}
        showModal={handleShowModal}
      />
    );
  };

  const handleShowModal = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);
  const postDataFetch: any = useSelector<rootReducerType>((state) => state.postState.postData);
  return (
    <React.Fragment>
      {postDataFetch.length == 0 ? (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color={`${Color.primary}`} />
        </View>
      ) : (
          <View style={styles.screen}>
            <Modal isVisible={isVisible} showModal={handleShowModal} closeModal={handleCloseModal} navigation={navigation}>
              <FlatList
                style={styles.listPost}
                data={postDataFetch}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} colors={[Color.primary]} onRefresh={loadHomePage} />
                }
              />
              <ButtonCircle iconName="edit" typeIcon="MI" navigate={() => navigation.navigate('UpLoadPost')} />
            </Modal>
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
