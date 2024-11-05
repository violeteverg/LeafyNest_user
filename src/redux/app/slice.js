import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 1,
  isOpen: false,
  isDelete: false,
  productId: 0,
  type: "create",
  checkboxValue: { isActive: false },
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    resetCount: (state) => {
      state.count = 1;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsDelete: (state, action) => {
      state.isDelete = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },

    setType: (state, action) => {
      state.type = action.payload;
    },
    setCheckboxValue: (state, action) => {
      state.checkboxValue = { isActive: action.payload.isActive };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  resetCount,
  setIsOpen,
  setIsDelete,
  setProductId,
  setType,
  setCheckboxValue,
  setUser,
} = appSlice.actions;

export default appSlice.reducer;
