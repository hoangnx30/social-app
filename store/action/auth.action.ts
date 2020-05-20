import { firebaseConfig } from '../../config/firebase.config';

const API_KEY = firebaseConfig.apiKey;
import firebase from 'firebase';
import axios from 'axios';
import { LOG_IN, SET_LOADING } from './actionTypes';

export const LoginAsync = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
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

        // axios.get(`https://sguet-9a1c4.firebaseio.com/users/${data.localId}.json`).then((res) => {
        //   dispatch({
        //     type: LOG_IN,
        //     payload: {
        //       userInfo: {
        //         accessToken: data.idToken,
        //         refreshToken: data.refreshToken,
        //         expirationTime: data.expiresIn,
        //         uid: data.localId,
        //       },
        //       user: { ...res.data, userId: data.localId },
        //     },
        //   });
        // });
      })
      .catch((error) => console.log(error));
  };
};
