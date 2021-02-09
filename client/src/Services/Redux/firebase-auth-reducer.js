import { auth } from "../Firebase/Firebase";
const SET_CREDENTIALS = "SET_CREDENTIALS";
const FIREBASE_CHECK = "FIREBASE_CHECK";
const FIREBASE_LOGOUT = "FIREBASE_LOGOUT";
const FIREBASE_TYPE = "FIREBASE_TYPE";
const SET_USER = "SET_USER";
const SET_ERROR = "SET_ERROR";

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  user: {},
  error: "",
  type: "",
};

const FirebaseAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREDENTIALS: {
      return {
        ...state,
        ...action.credentials,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case FIREBASE_LOGOUT: {
      return { ...state, user: auth.signOut() };
    }
    case FIREBASE_CHECK: {
      return {
        ...state,
        user: auth.onAuthStateChanged((userAuth) => userAuth),
      };
    }
    case FIREBASE_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    default:
      return state;
  }
};

export const fireLogin = (username, password) => {
  return (dispatch) => {
    let userName =
      username.search("@") < 0 ? username + "@findmyparent.org" : username;

    auth
      .signInWithEmailAndPassword(userName, password)
      .then((authUser) => dispatch({ type: SET_USER, payload: authUser }))
      .catch((error) => dispatch({ type: SET_ERROR, payload: error }));
  };
};
export const fireLogout = () => ({ type: FIREBASE_LOGOUT });
export const fireCheck = () => ({ type: FIREBASE_CHECK });
export const RegisterWithEmail = (email, password) => {
  return (dispatch) => {
    let userName = email.search("@") < 0 ? email + "@findmyparent.org" : email;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => dispatch({ type: SET_USER, payload: user }))
      .catch((error) => dispatch({ type: SET_ERROR, payload: error }));
  };
};
export const setCredentials = (credentials) => ({
  type: SET_CREDENTIALS,
  credentials,
});
export const setType = (type) => ({ type: FIREBASE_TYPE, payload: type });

export default FirebaseAuthReducer;
