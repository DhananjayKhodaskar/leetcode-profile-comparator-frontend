import { createSlice } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    joinedGroups: [],
  },
  reducers: {
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
  },
});

export const { setJoinedGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
