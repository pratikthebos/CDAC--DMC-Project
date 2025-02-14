import axios from 'axios';

export const getAllAssignments = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/assignments');
    dispatch({ type: 'GET_ASSIGNMENTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_ASSIGNMENTS_FAIL', payload: error.response.data });
  }
};
