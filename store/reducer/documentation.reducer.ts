const initialState = {
  listFolder: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_FOLDER_DOCUMENTATION':
      return {
        ...state,
        listFolder: action.payload.data,
      };
    default:
      return state;
  }
};
