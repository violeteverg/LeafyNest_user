import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 1,
  isOpen: false,
  isAddrOpen: false,
  isDelete: false,
  productId: 0,
  type: "create",
  checkboxValue: { isActive: false },
  user: null,
  address: JSON.parse(sessionStorage.getItem("__Taddr")) || null,
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
    setIsAddrOpen: (state, action) => {
      state.isAddrOpen = action.payload;
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
    setAddress: (state, action) => {
      state.address = action.payload;
      sessionStorage.setItem("__Taddr", JSON.stringify(action.payload));
    },
  },
});

export const {
  increment,
  decrement,
  resetCount,
  setIsOpen,
  setIsAddrOpen,
  setIsDelete,
  setProductId,
  setType,
  setCheckboxValue,
  setUser,
  setAddress,
} = appSlice.actions;

export default appSlice.reducer;
