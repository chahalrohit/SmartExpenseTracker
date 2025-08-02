import React from 'react';
import { View } from 'react-native';
import CustomText from '../../components/CustomText/CustomText';
import * as constants from '../../utils/constants';
import styles from './BalanceExpense.styles';

const BalanceExpense = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <CustomText style={styles.totalBalance}>Total Balance</CustomText>
        <CustomText style={styles.balance}>
          {constants.moneySign} 15000
        </CustomText>
      </View>
      <View style={styles.view2}>
        <CustomText style={styles.monthlyExpense}>Monthly Expenses</CustomText>
        <CustomText style={styles.expense}>
          {constants.moneySign} 15000
        </CustomText>
      </View>
    </View>
  );
};
export default BalanceExpense;
