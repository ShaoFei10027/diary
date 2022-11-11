import { configureStore, combineReducers } from '@reduxjs/toolkit';
import rootSlice from './reducer/rootSlice';

const reducer = combineReducers({
  root: rootSlice,
});

const store = configureStore({ reducer });

export default store;
