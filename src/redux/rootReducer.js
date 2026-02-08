import { combineReducers } from "@reduxjs/toolkit";
import basicSlice from "./basic/basicSlice";

const rootReducer = combineReducers({
	basic: basicSlice,
});

export default rootReducer;
