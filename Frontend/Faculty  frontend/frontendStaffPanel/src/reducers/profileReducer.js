const initialState = { profile: {}, error: null };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS':
      return { ...state, profile: action.payload };
    case 'GET_PROFILE_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
