import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import authReducer from './auth.reducer';
import commentReducer from './comment.reducer';

const rootReducer = combineReducers({
  postState: postReducer,
  authState: authReducer,
  commentState: commentReducer,
});
export default rootReducer;
export type rootReducerType = ReturnType<typeof rootReducer>;
