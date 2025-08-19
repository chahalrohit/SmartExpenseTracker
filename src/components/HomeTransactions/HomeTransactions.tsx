import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import CustomText from '../../components/CustomText/CustomText';
import Space from '../../components/Space/Space';
import { HomeTransaction } from '../../data/homeLastTransactions';
import { HomeTransactionItem } from '../../types/home';
import TransactionList from '../Lists/transactionList/TransactionList';
import styles from './HomeTransactions.styles';

const HomeTransactions = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<HomeTransactionItem[]>(HomeTransaction);

  const renderItem = useCallback(
    ({ item, index }: { item: HomeTransactionItem; index: number }) => {
      return <TransactionList item={item} index={index} />;
    },
    [data],
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>Last 5 Transactions</CustomText>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        ListHeaderComponent={<Space />}
      />
    </View>
  );
};
export default HomeTransactions;
