import { combineReducers } from 'redux';

import postReducer from './post.reducer';

const rootReducer = combineReducers({
  postState: postReducer,
});
export default rootReducer;
export type rootReducerType = ReturnType<typeof rootReducer>;
