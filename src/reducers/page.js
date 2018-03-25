const initState = {
  curPage: 1,
  totalItems: 0,
  pageSize: 5,
  startIndex: 0,
  pageOfUsers: [],
  isFetching: false,
  err: ''
};

const page = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TOTAL_ITEMS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'SET_TOTAL_ITEMS_SUCCESS':
      return {
        ...state,
        totalItems: action.totalItems,
        isFetching: false,
        err: ''
      };
    case 'SET_TOTAL_ITEMS_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.err
      }
    case 'FETCH_PAGE_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_PAGE_SUCCESS': {
      const size = state.pageSize;
      const curPage = action.page;
      const startIndex = (curPage - 1) * size;
      return {
        ...state,
        pageOfUsers: action.pageOfUsers,
        isFetching: false,
        err: '',
        curPage,
        startIndex,
        pageSize: action.pageSize
      };
    }
    case 'FETCH_PAGE_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'ADD_USER_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'ADD_USER_SUCESS': {
      if (state.pageOfUsers.length < state.pageSize) {
        return {
          ...state,
          isFetching: false,
          err: '',
          pageOfUsers: [
            ...state.pageOfUsers,
            action.user
          ]
        };
      } else {
        return state;
      }
    }
    case 'ADD_USER_FAILURE': 
      return  {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'DELETE_USER_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'DELETE_USER_SUCCESS': {
      let index = 0;
      for (let i = 0; i < state.pageOfUsers.length; i++) {
        if (state.pageOfUsers[i]._id === action.id) {
          index = i;
          break;
        }
      }
      return {
        ...state,
        pageOfUsers: [
          ...state.pageOfUsers.slice(0, index),
          ...state.pageOfUsers.slice(index + 1)
        ]
      };
    }
    case 'DELETE_USER_FAILURE': 
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'EDIT_USER_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'EDIT_USER_SUCCESS': {
      let index = 0;
      let newUsers = state.pageOfUsers.map(user => {
        if (user.id === action.id) {
          return action.user;
        } else {
          return user;
        }
      });
      return {
        ...state,
        pageOfUsers: newUsers
      };
    }
    case 'EDIT_USER_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'SORT_USERS': {
      const newUsers = [...state.pageOfUsers];
      const key = action.key;
      newUsers.sort((user1, user2) => {
        if (user1[key] === user2[key]) {
          return 0;
        }
        return user1[key] < user2[key] ? -1 : 1;
      });
      return {
        ...state,
        pageOfUsers: newUsers
      };
    }
    default:
      return state;
  }
}

export default page;