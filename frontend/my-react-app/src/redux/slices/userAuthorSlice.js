// Create redux slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Make HTTP request using redux-thunk middleware
export const userAuthorLoginThunk = createAsyncThunk(
  "user-auhtor-login",
  async (userCredObj, thunkApi) => {
    try {
      if (userCredObj.userType === "user") {
        const res = await axios.post(
          "http://localhost:4000/user-api/login",
          userCredObj
        );
        if (res.data.message === "login success") {
          // Store token in local/session storage
          localStorage.setItem("token", res.data.token);
        } else {
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }
      if (userCredObj.userType === "author") {
        const res = await axios.post(
          "http://localhost:4000/author-api/login",
          userCredObj
        );
        if (res.data.message === "login success") {
          // Store token in local/session storage
          localStorage.setItem("token", res.data.token);
        } else {
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }
    } catch (err) {
      // Sanitize error to only include necessary data (e.g., message)
      const errorMessage = err?.response?.data?.message || err.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const userAuthorSlice = createSlice({
  name: "user-author-login",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccurred: false,
    errMsg: "",
  },
  reducers: {
    resetState: (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginUserStatus = false;
      state.errorOccurred = false;
      state.errMsg = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userAuthorLoginThunk.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
        state.errMsg = "";
        state.errorOccurred = false;
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        // Only store the error message, avoiding the entire Axios error object
        state.errMsg = action.payload;
        state.errorOccurred = true;
      }),
});

// Export action creator functions
export const { resetState } = userAuthorSlice.actions;
// Export root reducer of this slice
export default userAuthorSlice.reducer;
