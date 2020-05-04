import { GroupActionType, SET_GROUP } from './../action/actionTypes';
const initialState = {
  group: [],
};

export default (state = initialState, action: GroupActionType) => {
  switch (action.type) {
    case SET_GROUP: 
      return {
        ...state,
        group: action.payload.data
      }
    default:
      return state;
  }
};
