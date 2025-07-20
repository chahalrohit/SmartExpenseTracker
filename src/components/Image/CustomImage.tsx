import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { ResizeMode } from 'react-native-fast-image';

interface Props {
  source: number;
  style: StyleProp<{}>;
  resizeMode?: ResizeMode;
}

const CustomImage = ({ source, style, resizeMode = 'contain' }: Props) => {
  return <FastImage source={source} style={style} resizeMode={resizeMode} />;
};
export default CustomImage;
