

export const calculateTotalExpense = (sumAmount,amount) =>{
  sumAmount = sumAmount + Number(amount);
  return sumAmount;
}
  ;

export const selectRemaining = (state) =>
  state.budget - selectTotalExpense(state);