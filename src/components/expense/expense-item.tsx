import {getExpense, saveExpense} from '@src/mmkv/expense';
import useExpenseStore from '@src/store/expense';
import {
  backgroundColor,
  borderColor,
  Expense,
  ExpenseType,
  faintBackgroundColor,
} from '@src/types/expense';
import {vndMask} from '@src/utils/money';
import classNames from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import MaskInput from 'react-native-mask-input';
import Svg, {Path} from 'react-native-svg';
import Text from '../text';
import AddExpense from './add-expense';

type Props = {
  type: ExpenseType;
};

const ExpenseItem = ({type}: Props) => {
  const {viewMonth, setForceRefresh} = useExpenseStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState<number | null>(null);

  const onAdd = (data: {name: string; amount: string}) => {
    const current: Expense = {
      type: type,
      month: viewMonth,
      items: [
        ...(expense?.items ?? []),
        {
          name: data.name,
          amount: parseFloat(data.amount?.replace(/,/g, '')),
          isChecked: false,
        },
      ],
    };
    setExpense(current);
    // done: save to mmkv
    saveExpense(current);
    setForceRefresh(new Date().toISOString());
    setShowAddNew(false);
  };

  const onUpdate = (data: {name: string; amount: string}) => {
    const current: Expense = {
      type: type,
      month: viewMonth,
      items:
        expense?.items?.map((item, i) => {
          if (i === showEdit) {
            return {
              ...item,
              name: data.name,
              amount: parseFloat(data.amount?.replace(/,/g, '')),
            };
          }
          return item;
        }) ?? [],
    };
    setExpense(current);
    saveExpense(current);
    setForceRefresh(new Date().toISOString());
    setShowEdit(null);
  };

  const onDelete = (index: number) => {
    const current: Expense = {
      type: type,
      month: viewMonth,
      items: expense?.items?.filter((_, i) => i !== index) ?? [],
    };
    setExpense(current);
    saveExpense(current);
    setForceRefresh(new Date().toISOString());
    setShowEdit(null);
  };

  const onCheck = (index: number) => {
    const current: Expense = {
      type: type,
      month: viewMonth,
      items:
        expense?.items?.map((item, i) => {
          if (i === index) {
            return {...item, isChecked: !item.isChecked};
          }
          return item;
        }) ?? [],
    };
    setExpense(current);
    // done: save to mmkv
    saveExpense(current);
    setForceRefresh(new Date().toISOString());
  };

  useEffect(() => {
    const data = getExpense(viewMonth, type);
    if (data) {
      setExpense(data);
    }
  }, [viewMonth, type]);

  const totalAmount = useMemo(() => {
    return expense?.items?.reduce((acc, item) => acc + item.amount, 0) ?? 0;
  }, [expense]);
  const checkedAmount = useMemo(() => {
    return (
      expense?.items?.reduce((acc, item) => {
        if (item.isChecked) {
          return acc + item.amount;
        }
        return acc;
      }, 0) ?? 0
    );
  }, [expense]);

  return (
    <View
      className="mb-[8px] rounded-[8px] overflow-hidden"
      style={{
        backgroundColor: faintBackgroundColor[type],
      }}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(!isCollapsed)}
        className={
          'border p-[8px] rounded-[8px] overflow-hidden flex-row items-center justify-between'
        }
        style={{
          borderColor: borderColor[type],
          backgroundColor: backgroundColor[type],
        }}>
        <Text className="font-semibold text-[16px] text-black-primary">
          {type}
        </Text>
        <Text className="font-medium text-[16px] text-black-primary">
          {checkedAmount.toLocaleString()}
          <Text className="font-medium text-[16px] text-pink-primary">
            /{totalAmount.toLocaleString()}
          </Text>
        </Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed} style={{padding: 0, margin: 0}}>
        {(expense?.items?.length ?? 0) === 0 && (
          <Text className="text-[14px] text-center text-gray-500 p-[8px]">
            No data
          </Text>
        )}

        {!!expense?.items?.length &&
          (expense?.items?.length ?? 0) > 0 &&
          expense?.items?.map((item, index) => (
            <View
              key={index}
              className={classNames('flex-row justify-between p-[8px]', {
                'border-b': index !== expense?.items.length - 1,
              })}
              style={{
                borderColor: faintBackgroundColor[type],
              }}>
              <TouchableOpacity
                className="flex-1"
                onPress={() => setShowEdit(index)}>
                <Text className="text-[14px] font-medium">{item.name}</Text>
              </TouchableOpacity>
              <MaskInput
                mask={vndMask}
                placeholder="XXX,XXX"
                keyboardType="numeric"
                className="w-[120px] px-[8px] h-[32px] text-[18px] border rounded-[4px] mx-[16px] text-white font-medium"
                style={{
                  backgroundColor: faintBackgroundColor[type],
                  borderColor: faintBackgroundColor[type],
                }}
                textAlign="right"
                numberOfLines={1}
                inputMode="numeric"
                placeholderTextColor="#CDCDCD"
                editable={false}
                value={Number(item.amount).toLocaleString('en-US')}
              />

              <TouchableOpacity
                className={classNames(
                  'w-[40px] h-[24px] mt-[4px] rounded-full items-center justify-center',
                  {
                    'bg-white': !item.isChecked,
                    'bg-green-primary': item.isChecked,
                  },
                )}
                onPress={() => onCheck(index)}>
                <Svg viewBox="0 0 24 24" width={18} height={18}>
                  <Path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z" />
                </Svg>
              </TouchableOpacity>
            </View>
          ))}

        <TouchableOpacity
          className="p-[8px] mx-[8px] rounded-[8px] mb-[8px]"
          style={{
            backgroundColor: backgroundColor[type],
          }}
          onPress={() => setShowAddNew(true)}>
          <Text className="text-[14px] text-center text-black-primary font-semibold">
            + Add new
          </Text>
        </TouchableOpacity>
      </Collapsible>

      <AddExpense
        isShow={showAddNew}
        onClose={() => setShowAddNew(false)}
        onAdd={onAdd}
      />

      <AddExpense
        isShow={showEdit !== null}
        onClose={() => setShowEdit(null)}
        onAdd={onUpdate}
        editItem={{
          name: expense?.items?.[showEdit ?? 0]?.name ?? '',
          amount: expense?.items?.[showEdit ?? 0]?.amount.toString() ?? '',
          index: showEdit ?? 0,
        }}
        onDelete={onDelete}
      />
    </View>
  );
};

export default ExpenseItem;
