import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: {
      course: null,
      isFetching: false,
      error: false,
      msg: "",
    },
  },

  reducers: {
    deleteCourseStart: (state) => {
      state.courses.isFetching = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.courses.isFetching = false;
      state.courses.msg = action.payload;
    },

    deleteCourseFailed: (state, action) => {
      state.courses.error = true;
      state.courses.isFetching = false;
      state.courses.msg = action.payload;
    },
  },
});

export const { deleteCourseStart, deleteCourseSuccess, deleteCourseFailed } =
  courseSlice.actions;

export default courseSlice.reducer;
