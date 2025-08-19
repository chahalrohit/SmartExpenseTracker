import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    marginTop: scale(10),
  },
  text: {
    fontFamily: fonts.fontFamily.semiBold,
    fontSize: fonts.fontSize.lg,
  },
});
