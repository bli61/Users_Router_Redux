const users = (state = [], action) => {
  switch(action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.user
      ];
    case 'DELETE_USER': {
      let index = 0;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          index = i;
          break;
        }
      }
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    }
    case 'EDIT_USER': {
      let index = 0;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          index = i;
          break;
        }
      }
      return [
        ...state.slice(0, index),
        action.user,
        ...state.slice(index + 1)
      ];
    }
    default:
      return state;
  }
}

export default users;