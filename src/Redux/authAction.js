import { LOGIN ,LOGOUT, LANG, SIDEBAR} from "./actionTypes"




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

export const sidebarDis = ( check ) => {
  return {
    type: SIDEBAR,
    payload: { check },
  };
};