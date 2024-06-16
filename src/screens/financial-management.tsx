import CircularProgress from '@src/components/circular-progress';
import ProgressBar from '@src/components/progress-bar';
import Text from '@src/components/text';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const FinancialManagement = () => {
  return (
    <SafeAreaView>
      {/* <View className="px-[16px]">
        <ProgressBar progress={50} />
        <Text>Financial Management</Text>
      </View> */}

      <CircularProgress current={13000} total={20000} />
    </SafeAreaView>
  );
};

export default FinancialManagement;
