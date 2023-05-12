import { createSlice } from "@reduxjs/toolkit";
import store from "../store";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  credentials: null,
};

export async function signIn(credentials) {
    
  try {
    // on utilise fetch pour faire la requête
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method:"POST", 
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(credentials)
    });
    const data = await response.json();
    store.dispatch(actions.loginSuccess(data))
  } catch (error) {
    store.dispatch(actions.loginError(error));
  }
}

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetching action & reducer
    login: (state, action) => {
      state.loading = true;
      state.credentials = action.payload;
      state.error = null;
      signIn(action.payload)
    },
    // resolved action & reducer
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    // rejected action & reducer
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
    },
  },
});

export  const {login, loginSuccess, loginError} = actions
export default reducer;
