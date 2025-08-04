import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceExpense from '../../components/BalanceExpense/BalanceExpense';
import CommonHeader from '../../components/Header/CommonHeader';
import HomeTransactions from '../../components/HomeTransactions/HomeTransactions';
import * as constants from '../../utils/constants';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: constants.horizontal }}>
      <CommonHeader title="Dashboard" icon="settings" />
      <BalanceExpense />
      <HomeTransactions />
    </SafeAreaView>
  );
};
export default Home;
