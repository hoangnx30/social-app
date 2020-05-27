import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const LogOutScreen = ({ navigation }: any) => {
  const userInfo: UserInfo = useSelector<rootReducerType>((state) => state.authState.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'LOG_OUT',
    });
  }, []);
  return <View></View>;
};

export default LogOutScreen;
