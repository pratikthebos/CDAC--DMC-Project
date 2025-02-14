const initialState = { studyMaterials: [], error: null };

const studyMaterialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STUDYMATERIALS_SUCCESS':
      return { ...state, studyMaterials: action.payload };
    case 'GET_STUDYMATERIALS_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default studyMaterialReducer;
