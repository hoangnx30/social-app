import { firebaseConfig } from '../../config/firebase.config';

const API_KEY = firebaseConfig.apiKey;
import firebase from 'firebase';
import axios from 'axios';
import { LOG_IN, SET_LOADING, SET_ERROR_AUTH } from './actionTypes';

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
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: true,
          },
        });
        const data = response.data;
        firebase
          .database()
          .ref(`users/${data.localId}`)
          .on('value', (snapshot) => {
            dispatch({
              type: LOG_IN,
              payload: {
                userInfo: {
                  accessToken: data.idToken,
                  refreshToken: data.refreshToken,
                  expirationTime: data.expiresIn,
                  uid: data.localId,
                },
                user: { userId: data.localId, ...snapshot.val() },
              },
            });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
        dispatch({
          type: SET_ERROR_AUTH,
          payload: {
            data: true,
          },
        });
      });
  };
};
