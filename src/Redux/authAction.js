import { LOGIN ,LOGOUT, LANG} from "./actionTypes"

// ,  ,LANG}


export const loginUser = ({ uid, JWT, message }) => {
  alert()

  return {
    type: LOGIN,
    payload: { uid, JWT, message },
  };
};

export const logoutUser = () => {

  return {
    type: LOGOUT,
  };
};

export const language = ( lang ) => {
  return {
    type: LANG,
    payload: { lang },
  };
};