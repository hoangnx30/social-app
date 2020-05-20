const initialState = {
  users: [],
  lastMessages: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_ALL_USER':
      return {
        ...state,
        users: action.payload.data,
      };
    case 'SET_LAST_MESSAGES':
      return {
        ...state,
        lastMessages: action.payload.data,
      };
    default:
      return state;
  }
};
