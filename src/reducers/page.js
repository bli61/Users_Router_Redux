const initState = {
  curPage: 1,
  totalItems: 0,
  pageSize: 5,
};

const page = (state = initState, action) => {
  switch(action.type) {
    case 'SET_TOTAL_ITEMS':
      return {
        ...state,
        totalItems: action.totalItems
      };
    case 'SET_PAGE': {
      return {
        ...state,
        curPage: action.page,
      };
    }
    default:
      return state;
  }
}

export default page;