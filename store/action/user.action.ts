export const setData = (uidPost: string, content: string) => {
  return {
    type: 'SET_DATA',
    payload: {
      uidPost,
      content,
    },
  };
};
