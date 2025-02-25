import ExpenseList from '@src/components/expense/expense-list';
import CircularProgress from '@src/components/circular-progress';
import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import useExpenseStore from '@src/store/expense';
import {getAllExpensesByMonth} from '@src/mmkv/expense';
import {Expense} from '@src/types/expense';

const FinancialManagement = () => {
  const {viewMonth, forceRefresh} = useExpenseStore();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const currentExpenses = getAllExpensesByMonth(viewMonth);
    setExpenses(currentExpenses);
  }, [viewMonth, forceRefresh]);

  const totalAmount = useMemo(() => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.items?.reduce((acc, item) => acc + item.amount, 0) ?? 0;
    });
    return total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, forceRefresh]);

  const totalCheckedAmount = useMemo(() => {
    let total = 0;
    expenses.forEach(expense => {
      total +=
        expense.items?.reduce((acc, item) => {
          if (item.isChecked) {
            return acc + item.amount;
          }
          return acc;
        }, 0) ?? 0;
    });
    return total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, forceRefresh]);

  return (
    <View className="p-[8px] bg-black-primary flex-1">
      <CircularProgress
        current={totalAmount - totalCheckedAmount}
        total={totalAmount}
      />

      <ExpenseList />
    </View>
  );
};

export default FinancialManagement;
