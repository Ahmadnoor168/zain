// // authReducer.js
import { LOGIN,LOGOUT,LANG, SIDEBAR} from './actionTypes';
//  ,LANG



const initialState = {
  isAuthenticated: false,
  uid: null,
  jwtToken: null,
  message: null,
  lang: "en",
  check: false,
};
// uid, JWT, message
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        uid: action.payload.uid,
        jwtToken: action.payload.JWT,
        message: action.payload.message,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        uid: null,
        jwtToken: null,
        message: null,
      };
      case LANG:
      return {
        ...state,
        lang: action.payload.lang
      };


      case SIDEBAR:
      return {
        ...state,
        check: action.payload.check
      };

      
    default:
      return state;
  }
};

export default authReducer;
