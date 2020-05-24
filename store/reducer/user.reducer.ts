const initialState = {
  uidPost: null,
  content: null,
  urlImage: null
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        uidPost: action.payload.uidPost,
        content: action.payload.content,
        urlImage: action.payload.urlImage
      };
    default:
      return state;
  }
};
