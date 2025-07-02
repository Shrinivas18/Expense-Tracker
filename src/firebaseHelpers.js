// src/firebaseHelpers.js
import db from "./firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Add new expense
export const addExpenseToDB = async (expense) => {
  const docRef = await addDoc(collection(db, "expenses"), expense);
  return docRef.id;
};

// Get all expenses
export const fetchExpensesFromDB = async () => {
  const querySnapshot = await getDocs(collection(db, "expenses"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update an expense
export const updateExpenseInDB = async (id, updatedData) => {
  const docRef = doc(db, "expenses", id);
  await updateDoc(docRef, updatedData);
};

// Delete an expense
export const deleteExpenseFromDB = async (id) => {
  const docRef = doc(db, "expenses", id);
  await deleteDoc(docRef);
};
