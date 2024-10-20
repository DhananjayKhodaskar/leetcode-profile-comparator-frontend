import { createSlice } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    joinedGroups: [],
    selectedGroup: null, // New state for the selected group
  },
  reducers: {
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload; // Action to set the current selected group
    },
  },
});

export const { setJoinedGroups, setSelectedGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
