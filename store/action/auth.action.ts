import * as firebase from 'firebase';
import { LOG_IN } from './actionTypes';
import { UserInfo } from './types';

const Login = (userInfo: UserInfo) => {
  return {
    type: LOG_IN,
    payload: {
      userInfo: userInfo,
    },
  };
};
export const LoginAsync = (email: string, password: string) => {
  return (dispatch: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // const userInfo = {
        //   accessToken: response.user.stsTokenManager.accessToken,
        //   refreshToken: response.user.stsTokenManager.refreshToken,
        //   expirationTime: response.user.stsTokenManager.expirationTime,
        //   uid: response.user?.uid,
        // };
        // dispatch(Login(userInfo));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
