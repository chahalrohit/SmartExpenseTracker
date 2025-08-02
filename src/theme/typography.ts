import { scale } from 'react-native-size-matters';

const typography = {
  fontFamily: {
    light: 'Montserrat-Light',
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    semiBold: 'Montserrat-SemiBold',
    bold: 'Montserrat-Bold',
  },
  fontSize: {
    xs: scale(10),
    sm: scale(12),
    md: scale(14),
    lg: scale(18),
    xl: scale(22),
    xxl: scale(30),
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700',
  },
};

export default typography;
