import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Redux/authUser'

export default configureStore({
    reducer: {
        user: userReducer,
    },
});

