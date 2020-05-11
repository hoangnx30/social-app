const initialState = {
  uidPost: null,
  content: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        uidPost: action.payload.uidPost,
        content: action.payload.content,
      };
    default:
      return state;
  }
};
