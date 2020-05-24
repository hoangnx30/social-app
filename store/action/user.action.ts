export const setData = (uidPost?: string, content?: string, urlImage?: string) => {
  return {
    type: 'SET_DATA',
    payload: {
      uidPost,
      content,
      urlImage,
    },
  };
};
