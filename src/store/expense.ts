import moment from 'moment';
import {create} from 'zustand';

interface ExpenseStore {
  viewMonth: string;
  setViewMonth: (month: string) => void;
}

const useExpenseStore = create<ExpenseStore>(set => ({
  viewMonth: moment().format('YYYY-MM'),
  setViewMonth: month => set({viewMonth: month}),
}));

export default useExpenseStore;
