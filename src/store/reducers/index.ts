import user from './user/user.reducer';
import scout from './scout/scout.reducer';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  user,
  scout
});
