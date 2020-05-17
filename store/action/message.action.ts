import firebase from 'firebase';

export const fetchAllUser = () => {
  return async (dispatch: any) => {
    const snapshot = await firebase.database().ref('users').once('value');
    const users = snapshot.val();
    const transformData = [];
    for (const key in users) {
      const data = {
        userId: key,
        ...users[key],
      };
      transformData.push(data);
    }
    return dispatch({
      type: 'GET_ALL_USER',
      payload: {
        data: transformData,
      },
    });
  };
};
