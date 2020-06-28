import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Button, TouchableNativeFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

import HeaderGroup from '../../../components/group/HeaderGroup';
import ButtonCircle from '../../../components/ButtonCircle';
import Post from '../../../components/Post';
import { transformData, fetchGroup, fetchDataPostGroup } from '../../../store/action/group.action';
import Colors from '../../../constants/Color';
import Modal from '../../../components/Modal';

const GroupHomeScreen = ({ route, navigation }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const params = route.params;
  const uidGroup = params.id;

  const group = useSelector((state) => state.groupState.group.find((item) => uidGroup === item.id));
  const membersOfG = group.members;

  console.log(membersOfG);

  const userUid = useSelector((state) => state.authState.user.userId);
  const isJoined = membersOfG.indexOf(userUid) >= 0 ? true : false;

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

  const handleShowModal = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleJoinGroup = useCallback(() => {
    const members = [...membersOfG, userUid];
    membersOfG.push(userUid);
    firebase.database().ref(`group/${uidGroup}`).update({ members: members });
  }, [userUid]);

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

  return (
    <View style={styles.screen}>
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ marginBottom: 10 }}>
          <HeaderGroup name={group.nameGroup} members={group.members} />
        </View>
        <View>
          {!isJoined && (
            <View style={{ marginHorizontal: 10 }}>
              <TouchableNativeFeedback onPress={handleJoinGroup}>
                <View style={styles.buttonJG}>
                  <Text style={styles.textJG}>Join Group</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
          {result.length > 0 && isJoined && (
            <Modal closeModal={handleCloseModal} isVisible={isVisible} navigation={navigation}>
              <FlatList
                data={result}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl refreshing={isRefresh} onRefresh={handleRefresh} colors={[Colors.primary]} />
                }
              />
            </Modal>
          )}
          {result.length === 0 && isJoined && (
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

const styles = StyleSheet.create({
  buttonJG: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  textJG: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default GroupHomeScreen;
