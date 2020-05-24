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
      .on('value', (snapshoot) => {
        const groups = snapshoot.val();

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
        .once('value', (snapshoot) => {
          const value = snapshoot.val();
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
