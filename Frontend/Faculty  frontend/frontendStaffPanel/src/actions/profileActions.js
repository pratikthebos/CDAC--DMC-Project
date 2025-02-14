import axios from 'axios';

export const getProfileData = (facultyId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/${facultyId}`);
    dispatch({ type: 'GET_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_PROFILE_FAIL', payload: error.response.data });
  }
};
