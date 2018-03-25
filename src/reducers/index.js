import { combineReducers } from 'redux';
import redirect from './redirect';
import searchInput from './searchInput';
import page from './page';
import status from './status';

const reducers = combineReducers({
  redirect,
  searchInput,
  page,
  status
});

export default reducers;