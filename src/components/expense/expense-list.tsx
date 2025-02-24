import {ExpenseType} from '@src/types/expense';
import React from 'react';
import {FlatList, View} from 'react-native';
import ExpenseItem from './expense-item';

const ExpenseList = () => {
  return (
    <View className="px-[8px] mt-[16px] flex-1">
      <FlatList
        className="flex-1"
        data={Object.values(ExpenseType)}
        renderItem={({item}) => <ExpenseItem type={item} />}
      />
    </View>
  );
};

export default ExpenseList;
