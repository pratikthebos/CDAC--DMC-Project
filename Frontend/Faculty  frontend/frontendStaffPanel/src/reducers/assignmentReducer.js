const initialState = { assignments: [], error: null };

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ASSIGNMENTS_SUCCESS':
      return { ...state, assignments: action.payload };
    case 'GET_ASSIGNMENTS_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default assignmentReducer;
