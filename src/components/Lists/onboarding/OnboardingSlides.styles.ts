import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { colors, fonts } from '../../../theme';

const { height, width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  image: {
    height: scale(300),
    width: scale(300),
  },
  renderItem: {
    alignItems: 'center',
    height: height,
    width: width,
    paddingHorizontal: moderateScale(25),
    paddingTop: scale(100),
  },
  title: {
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.fontSize.xl,
    color: colors.black,
    marginTop: scale(50),
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.fontSize.md,
    color: colors.black,
    marginTop: scale(10),
    alignSelf: 'flex-start',
  },
});
