import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { assetReducer } from "../state/assets/reducer";
import transactionReducer from "../state/transactions/reducer";

const combinedReducers = combineReducers({
	transactions: transactionReducer,
	swapAssets: assetReducer
});

const store = configureStore({
	reducer: combinedReducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
