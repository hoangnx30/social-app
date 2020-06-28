import firebase from 'firebase';
import { SET_GROUP } from './actionTypes';

const TRANSFORM_DATA = 'TRANSFORM_DATA';

export const createGroup = (name: string, uid: string) => {
  firebase
    .database()
    .ref('group')
    .push({ name, members: [uid] });
};

export const fetchGroup = () => {
  const groupData: Array<any> = [];
  return (dispatch: any) => {
    firebase
      .database()
      .ref('group')
      .on('value', (snapShoot) => {
        const groups = snapShoot.val();

        for (const group in groups) {
          groupData.push({ ...groups[group], id: group });
        }
        dispatch({
          type: SET_GROUP,
          payload: {
            data: groupData.length === 0 ? [] : groupData,
          },
        });
      });
  };
};

export const transformData = (dataGroup: any) => {
  return (dispatch: any) => {
    if (Object.keys(dataGroup).length === 0) {
      return;
    }
    const result: any = [];
    for (const key in dataGroup) {
      const builder = { ...dataGroup[key], id: key };
      firebase
        .database()
        .ref(`users/${dataGroup[key]['owner']}`)
        .once('value', (snapShoot) => {
          const value = snapShoot.val();
          builder.user = value;
          result.push(builder);
          dispatch({
            type: TRANSFORM_DATA,
            payload: {
              data: result,
            },
          });
        });
    }
  };
};

export const fetchDataPostGroup = (uidGroup: string) => {
  return async (dispatch: any) => {
    firebase
      .database()
      .ref(`group/${uidGroup}`)
      .on('value', (snapshot) => {
        const dataGroup = snapshot.val();
        const listPost = dataGroup.ListPost;

        if (!listPost) {
          dispatch({
            type: 'SET_POST_DATA_GROUP',
            payload: {
              data: [],
            },
          });
          return;
        }

        const listPromise = Object.keys(listPost).map((key) => {
          return new Promise(async (resolve, reject) => {
            const listLike = listPost[key].listLike || [];
            const postItem = {
              id: key,
              ...listPost[key],
              isLike: listLike.indexOf(listPost[key].owner) < 0 ? false : true,
            };
            firebase
              .database()
              .ref(`users/${listPost[key].owner}`)
              .once('value', (snapshotUser) => {
                const user = snapshotUser.val();
                postItem.user = user;
                resolve(postItem);
              });
          });
        });

        Promise.all(listPromise).then((result) => {
          dispatch({
            type: 'SET_POST_DATA_GROUP',
            payload: {
              data: result,
            },
          });
        });
      });
  };
};
