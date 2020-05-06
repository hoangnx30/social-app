import { GroupActionType, SET_GROUP, TRANSFORM_DATA } from './../action/actionTypes';
const initialState = {
  group: [],
  transformData: [],
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
    default:
      return state;
  }
};
