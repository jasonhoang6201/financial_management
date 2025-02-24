import ExpenseList from '@src/components/expense/expense-list';
import CircularProgress from '@src/components/circular-progress';
import React from 'react';
import {View} from 'react-native';

const FinancialManagement = () => {
  return (
    <View className="p-[8px] bg-black-primary flex-1">
      <CircularProgress current={13000} total={20000} />

      <ExpenseList />
    </View>
  );
};

export default FinancialManagement;
