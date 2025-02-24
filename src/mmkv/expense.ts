import {Expense, ExpenseType} from '@src/types/expense';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'expense-storage',
});

export const saveExpense = (expense: Expense) => {
  storage.set(
    `expense-${expense.month}-${expense.type}`,
    JSON.stringify(expense),
  );
};

export const getExpense = (month: string, type: ExpenseType): Expense => {
  return JSON.parse(storage.getString(`expense-${month}-${type}`) || '{}');
};

export const deleteExpense = (month: string, type: ExpenseType) => {
  storage.delete(`expense-${month}-${type}`);
};

// export const getAllExpenses = (): Expense[] => {
//   return storage.getAllKeys().map(key => ({
//     expenses: JSON.parse(storage.getString(key) || '{}'),
//   }));
// };

export const deleteAllExpenses = () => {
  storage.clearAll();
};
