import axios from 'axios';

const addUserRequest = () => {
  return {
    type: 'ADD_USER_REQUEST'
  };
};

const addUserSuccess = user => {
  return {
    type: 'ADD_USER_SUCCESS',
    user
  };
};

const addUserFailure = err => {
  return {
    type: 'ADD_USER_FALURE',
    err
  };
};

const API_USERS_URL = '/api/users/';

export const addUser = user => {
  return (dispatch, getState) => {
    dispatch(addUserRequest());
    axios
      .post(API_USERS_URL, user)
      .then(response => {
        dispatch(addUserSuccess(user));
      })
      .catch(err => {
        dispatch(addUserFailure(err));
      });
  };
};

const deleteUserRequest = () => {
  return {
    type: 'DELETE_USER_REQUEST'
  };
};

const deleteUserSuccess = id => {
  return {
    type: 'DELETE_USER_SUCCESS',
    id
  };
};

const deleteUserFailure = err => {
  return {
    type: 'DELETE_USER_FAILURE',
    err
  };
};

export const deleteUser = id => {
  return (dispatch, getState) => {
    dispatch(deleteUserRequest());
    axios({
      method: 'delete',
      url: API_USERS_URL + id
    })
      .then(response => {
        dispatch(deleteUserSuccess(id));
      })
      .catch(err => {
        dispatch(deleteUserFailure(err));
      });
  }
};

const editUserRequest = () => {
  return {
    type: 'EDIT_USER_REQUEST'
  };
};

const editUserSuccess = (id, user) => {
  return {
    type: 'EDIT_USER_SUCCESS',
    id,
    user
  };
};

const editUserFailure = err => {
  return {
    type: 'EDIT_USER_FAILURE',
    err
  };
};

export const editUser = (id, user) => {
  return (dispatch, getState) => {
    dispatch(editUserRequest());
    axios
      .put(API_USERS_URL + id, user)
      .then(response => {
        dispatch(editUserSuccess(id, user));
      })
      .catch(err => {
        dispatch(editUserFailure(err));
      });
  };
};

const fetchPageRequest = () => {
  return {
    type: 'FETCH_PAGE_REQUEST'
  };
};

const fetchPageSuccess = (page, pageSize, pageOfUsers) => {
  return {
    type: 'FETCH_PAGE_SUCCESS',
    page,
    pageSize,
    pageOfUsers
  };
};

const fetchPageFailure = err => {
  return {
    type: 'FETCH_PAGE_FAILURE',
    err
  };
};

export const fetchPage = (page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  return (dispatch, getState) => {
    dispatch(fetchPageRequest());
    axios
      .get(API_USERS_URL + `range/${startIndex}/${pageSize}`)
      .then(response => {
        dispatch(fetchPageSuccess(page, pageSize, response.data));
      })
      .catch(err => {
        dispatch(fetchPageFailure(err));
      });
  }
}

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

const setTotalItemsRequest = () => {
  return {
    type: 'SET_TOTAL_ITEMS_REQUEST'
  };
};

const setTotalItemsSucess = totalItems => {
  return {
    type: 'SET_TOTAL_ITEMS_SUCCESS',
    totalItems
  };
};

const setTotalItemsFailure = err => {
  return {
    type: 'SET_TOTAL_ITEMS_FAILURE',
    err
  };
};

export const setTotalItems = () => {
  return (dispatch, setState) => {
    dispatch(setTotalItemsRequest());
    axios
      .get(API_USERS_URL + 'count')
      .then(response => {
        const totalItems = parseInt(response.data.count);
        dispatch(setTotalItemsSucess(totalItems));
      })
      .catch(err => {
        dispatch(setTotalItemsFailure(err));
      });
  };
};

export const sortUsers = key => {
  return {
    type: 'SORT_USERS',
    key
  };
};

export const setStatusCurPage = curPage => {
  return {
    type: 'SET_STATUS_CUR_PAGE',
    curPage
  };
};

export const setStatusOrder = order => {
  return {
    type: 'SET_STATUS_ORDER',
    order
  };
};