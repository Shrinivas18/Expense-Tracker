import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  PATCH_EXPENSE,
  UPDATE_EXPENSE,
} from "../commons/constants";

export const setBudget = (budget,budgetAction) => ({
  type: budgetAction,
  payload: budget,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const patchExpense = (expense) => ({
  type: PATCH_EXPENSE,
  payload: expense,
});

export const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});
