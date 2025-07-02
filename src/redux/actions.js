import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  IS_BUDGET_STORED,
  PATCH_EXPENSE,
  UPDATE_EXPENSE,
} from "../commons/constants";
import { doc, updateDoc, deleteDoc  } from "firebase/firestore";
import db from "../firebase";


export const setBudget = (budget, budgetAction) => ({
  type: budgetAction,
  payload: budget,
});

export const setIsBudgetStored = (val) => ({
  type: IS_BUDGET_STORED,
  payload: val,
});


export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const patchExpense = (expense) => ({
  type: PATCH_EXPENSE,
  payload: expense,
});

export const updateExpense = (expense) => async (dispatch) => {
  const expenseRef = doc(db, "expenses", expense.id);
  await updateDoc(expenseRef, {
    description: expense.description,
    category: expense.category,
    amount: expense.amount,
    paidTo: expense.paidTo,
    date: expense.date,
    time: expense.time,
  });

  dispatch({ type: UPDATE_EXPENSE, payload: expense });
};

export const deleteExpense = (id) => async (dispatch) => {
  const expenseRef = doc(db, "expenses", id);
  await deleteDoc(expenseRef);

  dispatch({ type: DELETE_EXPENSE, payload: id });
};
