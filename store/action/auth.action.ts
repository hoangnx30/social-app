import { firebaseConfig } from '../../config/firebase.config';

const API_KEY = firebaseConfig.apiKey;
import axios from 'axios';
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
    axios({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    })
      .then((response) => {
        const data = response.data;
        dispatch({
          type: LOG_IN,
          payload: {
            userInfo: {
              accessToken: data.idToken,
              refreshToken: data.refreshToken,
              expirationTime: data.expiresIn,
              uid: data.localId,
            },
          },
        });
      })
      .catch((error) => console.log(error));
  };
};
