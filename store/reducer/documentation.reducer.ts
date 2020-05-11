const initialState = {
  folder: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_FOLDER_DOCUMENTATION':
      return {
        ...state,
        folder: action.payload.data,
      };
    default:
      return state;
  }
};
