import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderGroup from '../../../components/group/HeaderGroup';
import ButtonCircle from '../../../components/ButtonCircle';
import Post from '../../../components/Post';
import { transformData, fetchGroup, fetchDataPostGroup } from '../../../store/action/group.action';
import Colors from '../../../constants/Color';
import Modal from '../../../components/Modal';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

const GroupHomeScreen = ({ route, navigation }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const params = route.params;
  const uidGroup = params.id;

  const group = useSelector((state) => state.groupState.group.find((item) => uidGroup === item.id));

  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setIsRefresh(true);
    dispatch(fetchGroup());
    setIsRefresh(false);
  }, [isRefresh, dispatch]);

  useEffect(() => {
    dispatch(fetchDataPostGroup(uidGroup));
  }, []);

  const result = useSelector((state) => state.groupState.postDataGroup);

  const renderItem = ({ item }: any) => {
    return (
      <Post
        uidPost={item.id}
        user={item.user}
        date={item.timeUpload}
        listLike={item.listLike ? item.listLike : []}
        listComment={item.listComment ? item.listComment : []}
        content={item.content}
        navigation={navigation}
        owner={item.owner}
        uidGroup={uidGroup}
        urlImage={item.urlImage}
        isLike={item.isLike}
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

  return (
    <View style={styles.screen}>
      <View style={{ width: '100%', height: '100%' }}>
        <View>
          <HeaderGroup name={group.nameGroup} members={group.members} />
        </View>
        <View>
          {result.length > 0 ? (
            <Modal closeModal={handleCloseModal} isVisible={isVisible} navigation={navigation}>
              <FlatList
                data={result}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl refreshing={isRefresh} onRefresh={handleRefresh} colors={[Colors.primary]} />
                }
              />
            </Modal>
          ) : (
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18 }}>No Post is available</Text>
            </View>
          )}
        </View>
      </View>
      <ButtonCircle
        iconName="edit"
        typeIcon="MI"
        navigate={() => navigation.navigate('UpLoadPostGroup', { uidGroup: params.id })}
      />
    </View>
  );
};

export default GroupHomeScreen;
