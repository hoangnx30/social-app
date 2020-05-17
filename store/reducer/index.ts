import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import authReducer from './auth.reducer';
import commentReducer from './comment.reducer';
import groupReducer from './group.reducer';
import userReducer from './user.reducer';
import documentationReducer from './documentation.reducer';
import messageReducer from './message.reducer';

const rootReducer = combineReducers({
  postState: postReducer,
  authState: authReducer,
  commentState: commentReducer,
  groupState: groupReducer,
  userState: userReducer,
  documentationState: documentationReducer,
  messageState: messageReducer,
});

export default rootReducer;
export type rootReducerType = ReturnType<typeof rootReducer>;
