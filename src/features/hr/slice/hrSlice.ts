import { createSlice } from "@reduxjs/toolkit";

type HrState = {
  loading: boolean;
};

const initialState: HrState = {
  loading: false,
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {},
});

export default hrSlice.reducer;