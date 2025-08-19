import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../theme';

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
});
