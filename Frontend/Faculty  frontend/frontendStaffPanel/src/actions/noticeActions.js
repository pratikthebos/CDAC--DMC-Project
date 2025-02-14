import axios from 'axios';

export const getAllNotices = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/notices');
    dispatch({ type: 'GET_NOTICES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_NOTICES_FAIL', payload: error.response.data });
  }
};
