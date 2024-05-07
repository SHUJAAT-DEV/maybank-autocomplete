import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './locations/searchSlice';

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
