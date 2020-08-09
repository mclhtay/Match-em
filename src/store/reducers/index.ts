import user from './user/user.reducer';
import scout from './scout/scout.reducer';
import game from './game/game.reducer';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  user,
  scout,
  game
});
