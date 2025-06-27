import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  PATCH_EXPENSE,
  SET_BUDGET,
  UPDATE_EXPENSE,
} from "./actions";

const initialState = {
  budget: 0,
  totalExpense: 0,
  remaining: 0,
  expenses: [],
  editExpenseData: null,
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUDGET:
      return {
        ...state,
        budget: action.payload.budget,
        // totalExpense: action.payload.totalExpense,
        // remaining: action.payload.remaining,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        editExpenseData: null,
      };
    case PATCH_EXPENSE:
      return { ...state, editExpenseData: action.payload };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        editExpenseData: null,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
