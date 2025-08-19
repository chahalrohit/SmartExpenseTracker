import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { fonts } from '../../theme';
import * as constants from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: scale(10),
    justifyContent: 'space-between',
  },
  view1: {
    width: scale(150),
    marginRight: scale(10),
    borderWidth: scale(0.5),
    borderRadius: constants.borderRadius2,
    padding: scale(7),
  },
  totalBalance: {
    fontFamily: fonts.fontFamily.medium,
    textAlign: 'center',
  },
  balance: {
    fontFamily: fonts.fontFamily.regular,
    textAlign: 'center',
  },
  view2: {
    width: scale(150),
    marginLeft: scale(10),
    borderWidth: scale(0.5),
    borderRadius: constants.borderRadius2,
    padding: scale(7),
  },
  monthlyExpense: {
    fontFamily: fonts.fontFamily.medium,
    textAlign: 'center',
  },
  expense: {
    fontFamily: fonts.fontFamily.regular,
    textAlign: 'center',
  },
});
