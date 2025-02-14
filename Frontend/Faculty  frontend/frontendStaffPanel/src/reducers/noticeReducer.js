const initialState = { notices: [], error: null };

const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTICES_SUCCESS':
      return { ...state, notices: action.payload };
    case 'GET_NOTICES_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default noticeReducer;
