import { StyleSheet, Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../utils';

const { height, width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.splashBG,
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
});
