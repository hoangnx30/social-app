import firebase from 'firebase';

export const loadDocumentation = () => {
  return (dispatch: any) => {
    firebase
      .database()
      .ref('documentation')
      .on('value', (snapshot) => {
        const transformData: Array<any> = [];
        const res = snapshot.val();

        for (const key in res) {
          const data = {
            id: key,
            ...res[key],
          };
          transformData.push(data);
        }
        dispatch({
          type: 'FETCH_FOLDER_DOCUMENTATION',
          payload: {
            data: transformData,
          },
        });
      });
  };
};
