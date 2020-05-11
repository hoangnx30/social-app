import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import authReducer from './auth.reducer';
import commentReducer from './comment.reducer';
import groupReducer from './group.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  postState: postReducer,
  authState: authReducer,
  commentState: commentReducer,
  groupState: groupReducer,
  userState: userReducer,
});
export default rootReducer;
export type rootReducerType = ReturnType<typeof rootReducer>;
