import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceExpense from '../../components/BalanceExpense/BalanceExpense';
import CommonHeader from '../../components/Header/CommonHeader';
import HomeTransactions from '../../components/HomeTransactions/HomeTransactions';
import styles from './Home.styles';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <CommonHeader title="Dashboard" icon="settings" />
      <BalanceExpense />
      <HomeTransactions />
    </SafeAreaView>
  );
};
export default Home;
