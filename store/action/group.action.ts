import firebase from 'firebase';
import { SET_GROUP } from './actionTypes';

export const createGroup = (name: string, uid: string) => {
  firebase
    .database()
    .ref('group')
    .push({ name, members: [uid] });
};

export const fetchGroup = () => {
  return (dispatch: any) => {
    const groupData: Array<any> = [];
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
