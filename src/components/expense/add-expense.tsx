import CloseIcon from '@src/assets/icons/close-icon';
import {vndMask} from '@src/utils/money';
import classNames from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';
import ReactNativeModal from 'react-native-modal';
import AppInput from '../design-system/input';
import Text from '../text';

type Props = {
  isShow: boolean;
  onClose: () => void;
  onAdd: (data: {name: string; amount: string}) => void;
  editItem?: {name: string; amount: string; index: number};
  onDelete?: (index: number) => void;
};

const AddExpense = ({isShow, onClose, onAdd, editItem, onDelete}: Props) => {
  const [data, setData] = useState({
    name: '',
    amount: '',
  });

  const canAdd = useMemo(() => {
    return data.name.length > 0 && data.amount.length > 0;
  }, [data]);

  useEffect(() => {
    if (!isShow) {
      setData({name: '', amount: ''});
    }
    if (editItem) {
      setData({name: editItem.name, amount: editItem.amount});
    }
  }, [editItem, isShow]);

  return (
    <ReactNativeModal
      isVisible={isShow}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      className="justify-end m-0">
      <View className="bg-black-primary rounded-t-[20px] p-[20px] min-h-[50%]">
        <View className="flex-row items-center justify-between">
          <Text className="text-[16px] font-semibold">
            {editItem ? 'Update' : 'Add New'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView>
          <View className="mt-[20px]">
            <Text className="text-[14px] font-semibold">Name</Text>
            <AppInput
              className="mt-[6px] border border-pink-primary rounded-[4px] text-[16px] text-white h-[40px]"
              placeholder="Name"
              placeholderTextColor="#CDCDCD"
              value={data.name}
              onChangeText={text => setData({...data, name: text})}
            />
          </View>

          <Text className="text-[14px] font-semibold mt-[20px]">Amount</Text>
          <MaskInput
            mask={vndMask}
            placeholder="XXX,XXX"
            keyboardType="numeric"
            className="mt-[6px] border border-pink-primary rounded-[4px] text-[16px] text-white p-[8px] h-[40px] text-left"
            textAlign="right"
            numberOfLines={1}
            inputMode="numeric"
            placeholderTextColor="#CDCDCD"
            value={data.amount}
            onChangeText={text => setData({...data, amount: text})}
          />

          <TouchableOpacity
            className={classNames(
              'bg-pink-primary rounded-[4px] py-[8px] mt-[20px]',
              {
                'opacity-20': !canAdd,
              },
            )}
            onPress={() => {
              onAdd(data);
              setData({name: '', amount: ''});
            }}
            disabled={!canAdd}>
            <Text className="text-[16px] font-semibold text-white text-center">
              {editItem ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>

          {editItem && (
            <TouchableOpacity
              className="border border-red-primary rounded-[4px] py-[8px] mt-[20px]"
              onPress={() => {
                if (onDelete) {
                  onDelete(editItem.index);
                }
              }}>
              <Text className="text-[16px] font-semibold text-red-primary text-center">
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default AddExpense;
