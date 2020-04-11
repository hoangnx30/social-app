import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
  postState: postReducer,
  authState: authReducer,
});
export default rootReducer;
export type rootReducerType = ReturnType<typeof rootReducer>;
