import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  token: null,
  loading: false,
  error: null,
  credentials: null,
};

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetching action & reducer
    login: (state, action) => {
      state.loading = true;
      state.credentials = action.payload;
      state.error = null;
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

    fetchProfile: (state, action) => {
      state.loading = true;
      state.error = null;
    },

    fetchProfileSuccess: (state, action) => {
      state.loading = true;
      state.profile = action.payload;
      state.error = null;
    },

    fetchProfileError: (state, action) => {
      state.loading = false;
      state.profile = null
      state.error = action.payload;
    },

    logout: (state) => {
      state.loading = false;
      state.profile = null;
      state.token = null;
      state.credentials = null;
      state.error = null;
    },
  },
});

export  const {login, loginSuccess, loginError, fetchProfile, fetchProfileSuccess, fetchProfileError, logout} = actions
export default reducer;
