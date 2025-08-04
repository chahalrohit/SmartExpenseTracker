import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: scale(2),
  },
  view1: {
    flex: 0.5,
    paddingVertical: scale(7),
  },
  image: {
    height: scale(30),
    width: scale(30),
    alignSelf: 'flex-start',
  },
  view2: {
    flex: 2,
  },
  name: {
    fontFamily: fonts.fontFamily.semiBold,
    fontSize: fonts.fontSize.md,
  },
  date: {
    fontFamily: fonts.fontFamily.regular,
    fontSize: fonts.fontSize.sm,
  },
  view3: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontFamily: fonts.fontFamily.semiBold,
    fontSize: fonts.fontSize.md,
  },
});
