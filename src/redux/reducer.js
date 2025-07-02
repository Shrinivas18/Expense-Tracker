import {
  SAVE_BUDGET,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  PATCH_EXPENSE,
  UPDATE_EXPENSE,
  UPDATE_BUDGET,
  SET_NEW_BUDGET,
  IS_BUDGET_STORED,
} from "../commons/constants";

const initialState = {
  budget: 0,
  totalExpense: 0,
  remaining: 0,
  expenses: [],
  editExpenseData: null,
  isBudgetStored: false,
};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BUDGET:
      return {
        ...state,
        budget: action.payload,
        remaining: action.payload,
      };
    case IS_BUDGET_STORED:
      return {
        ...state,
        isBudgetStored: action.payload,
      };
    case SET_NEW_BUDGET:
      return {
        ...state,
        budget: action.payload,
        remaining: action.payload,
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
