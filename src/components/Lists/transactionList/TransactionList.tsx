import React from 'react';
import { View } from 'react-native';
import CustomText from '../../../components/CustomText/CustomText';
import CustomImage from '../../../components/Image/CustomImage';
import { HomeTransactionItem } from '../../../types/home';
import * as constants from '../../../utils/constants';
import styles from './TransactionList.styles';

interface Props {
  item: HomeTransactionItem;
  index?: number;
}

const TransactionList = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <CustomImage source={item?.icon} style={styles.image} />
      </View>
      <View style={styles.view2}>
        <CustomText style={styles.name}>{item?.name}</CustomText>
        <CustomText style={styles.date}>{item?.date}</CustomText>
      </View>
      <View style={styles.view3}>
        <CustomText style={styles.amount}>
          {constants.moneySign}
          {item?.amount}
        </CustomText>
      </View>
    </View>
  );
};
export default TransactionList;
