const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload, isAuthenticated: true };
      case 'LOGIN_FAIL':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  