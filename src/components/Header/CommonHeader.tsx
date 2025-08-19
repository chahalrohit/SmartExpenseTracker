import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import CustomText from '../CustomText/CustomText';
import { scale } from 'react-native-size-matters';
import { colors, fonts } from '../../theme';
import { Settings } from 'lucide-react-native';
import * as constants from '../../utils/constants';

interface Props {
  title: string;
  icon: string;
  iconSize?: number;
  containerExt?: StyleProp<ViewStyle>;
}

const CommonHeader = ({ title, icon, iconSize = 20, containerExt }: Props) => {
  return (
    <View style={[styles.container, containerExt]}>
      <CustomText style={styles.title}>{title}</CustomText>
      <View style={[styles.iconView]}>
        {icon === 'settings' && (
          <Settings size={scale(iconSize)} color={colors.white} />
        )}
      </View>
    </View>
  );
};
export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: scale(7),
  },
  title: {
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.fontSize.xl,
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    padding: scale(7),
    borderRadius: constants.borderRadius2,
  },
});
