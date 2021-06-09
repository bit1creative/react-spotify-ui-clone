import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import moment from "moment";

const cookies = new Cookies();

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: cookies.get("spotifyClientID").id || null,
  },
  reducers: {
    setToken: (state, action) => {
      cookies.set(
        "spotifyClientID",
        { id: action.payload },
        {
          path: "/",
          expires: new Date(moment().add(1, "hour").format()),
        }
      );
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
