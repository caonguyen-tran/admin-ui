export const DispatchReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem("authData", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case 'LOGOUT':
      localStorage.removeItem("authData");
      return { ...state, user: null };

    default:
      return state;
  }
};