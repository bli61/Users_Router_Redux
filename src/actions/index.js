let curId = 0;

export const addUser = user => {
  return {
    type: 'ADD_USER',
    user: {
      ...user,
      id: curId++
    }
  };
};

export const deleteUser = id => {
  return {
    type: 'DELETE_USER',
    id
  };
};

export const editUser = (id, user) => {
  return {
    type: 'EDIT_USER',
    id,
    user
  };
};

export const redirect = () => {
  return {
    type: 'REDIRECT'
  };
};

export const cancelRedirect = () => {
  return {
    type: 'CANCEL_REDIRECT'
  };
};

export const changeSearchInput = input => {
  return {
    type: 'CHANGE_SEARCH_INPUT',
    input
  };
};

export const setPage = page => {
  return {
    type: 'SET_PAGE',
    page: page
  };
};

export const setTotalItems = totalItems => {
  return {
    type: 'SET_TOTAL_ITEMS',
    totalItems
  };
};

export const setPageOfUsers = pageOfUsers => {
  return {
    type: 'SET_PAGE_USERS',
    pageOfUsers
  };
};