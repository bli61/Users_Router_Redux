const pageOfUsers = (state = [], action) => {
  switch(action.type) {
    case 'SET_PAGE_USERS':
      return [...action.pageOfUsers];
    default:
      return state;
  }
};

export default pageOfUsers;