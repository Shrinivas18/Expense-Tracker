import { configureStore } from "@reduxjs/toolkit";
import { expenseReducer } from "./reducer";

const myStore = configureStore({reducer:expenseReducer})

export default myStore;