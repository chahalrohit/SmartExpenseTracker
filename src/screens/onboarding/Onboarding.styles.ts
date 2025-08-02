import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors, fonts } from '../../theme';

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
    justifyContent: 'center',
    height: height,
    width: width,
  },
  controls: {
    justifyContent: 'space-between',
    marginHorizontal: scale(40),
    marginTop: scale(40),
  },
  btnView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width / 1.12,
  },
  btn: {
    fontSize: fonts.fontSize.md,
    fontWeight: '600',
    padding: scale(10),
    color: colors.buttonColor,
  },
});
