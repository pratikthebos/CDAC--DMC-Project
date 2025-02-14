import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import assignmentReducer from './assignmentReducer';
import studyMaterialReducer from './studyMaterialReducer';
import noticeReducer from './noticeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  assignments: assignmentReducer,
  studyMaterials: studyMaterialReducer,
  notices: noticeReducer,
});

export default rootReducer;
