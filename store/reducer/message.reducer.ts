const initialState = {
  users: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_ALL_USER':
      return {
        ...state,
        users: action.payload.data,
      };
    default:
      return state;
  }
};
