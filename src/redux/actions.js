export const SET_BUDGET ="set_budget"
export const ADD_EXPENSE="add_expense"
export const PATCH_EXPENSE= "patch_expense"
export const DELETE_EXPENSE = "delete_expense"
export const UPDATE_EXPENSE = "update_expense"

// export const setBudget=(budget, totalExpense, remaining)=>({
    export const setBudget=(budget)=>({
    type:SET_BUDGET,
    // payload:{budget:budget,totalExpense:totalExpense,remaining:remaining}
    payload:{budget:budget}
})

export const addExpense=(expense)=>({
    type:ADD_EXPENSE,
    payload:expense
})

export const patchExpense=(expense)=>({
    type: PATCH_EXPENSE,
    payload : expense
})

export const updateExpense=(expense)=>({
    type: UPDATE_EXPENSE,
    payload : expense
})

export const deleteExpense=(id)=>({
    type: DELETE_EXPENSE,
    payload : id
})
