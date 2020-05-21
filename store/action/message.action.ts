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

export const fetchConversations = (listConversation: Array<string>, userId: string) => {
  return async (dispatch: any) => {
    if (!listConversation) {
      return;
    }
    const promises = [];
    const lastResult = [];

    listConversation.forEach((value) => {
      promises.push(firebase.database().ref(`conversations/${value}`).once('value'));
    });
    const result = await Promise.all(promises);
    const finalPromises = result.map(async (snapshot) => {
      return new Promise(async (resolve, reject) => {
        const final = {};
        final.conversationId = snapshot.ref.key;
        const dataConversation = snapshot.val();
        const anotherUserId = dataConversation.members.filter((member: any) => member !== userId)[0];
        const anotherUserSnapshot = await firebase.database().ref(`users/${anotherUserId}`).once('value');
        const anotherUser = anotherUserSnapshot.val();

        final.user = {
          name: anotherUser.fullName,
          _id: anotherUserId,
          avatar: anotherUser.avatar,
        };
        const messages = dataConversation.messages;
        if (!messages) {
          return;
        }
        const lastMessage = dataConversation.messages[Object.keys(messages)[Object.keys(messages).length - 1]];
        final.lastMessagesInfo = lastMessage[0];
        resolve(final);
      });
    });

    Promise.all(finalPromises).then((res) => {
      dispatch({
        type: 'SET_LAST_MESSAGES',
        payload: {
          data: res,
        },
      });
    });
  };
};
