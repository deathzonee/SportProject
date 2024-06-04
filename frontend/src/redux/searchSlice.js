import { createSlice } from "@reduxjs/toolkit";
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    resultSearch: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.resultSearch = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
