import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/api";
import appReducer from "./app/slice";
import { productApi } from "./product/api";
import { cartApi } from "./cart/api";
import { orderApi } from "./order/api";
import { addressApi } from "./address/api";

const rootReducer = combineReducers({
  app: appReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      addressApi.middleware
    ),
});

export default store;
