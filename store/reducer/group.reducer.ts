import { GroupActionType, SET_GROUP, TRANSFORM_DATA, SET_POST_DATA_GROUP } from './../action/actionTypes';
const initialState = {
  group: [],
  transformData: [],
  postDataGroup: [],
};

export default (state = initialState, action: GroupActionType) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload.data,
      };
    case TRANSFORM_DATA:
      return {
        ...state,
        transformData: action.payload.data,
      };
    case SET_POST_DATA_GROUP:
      return {
        ...state,
        postDataGroup: action.payload.data,
      };
    default:
      return state;
  }
};
