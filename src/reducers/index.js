import { combineReducers } from 'redux';
import users from './users';
import redirect from './redirect';
import searchInput from './searchInput';
import page from './page';
import pageOfUsers from './pageOfUsers';

const reducers = combineReducers({
  users,
  redirect,
  searchInput,
  page,
  pageOfUsers
});

export default reducers;