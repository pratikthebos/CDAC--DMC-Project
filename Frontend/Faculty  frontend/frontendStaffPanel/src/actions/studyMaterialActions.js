import axios from 'axios';

export const getStudyMaterials = (facultyId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/studyMaterials/${facultyId}`);
    dispatch({ type: 'GET_STUDYMATERIALS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_STUDYMATERIALS_FAIL', payload: error.response.data });
  }
};
