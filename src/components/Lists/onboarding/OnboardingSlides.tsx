import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Source as FastImageSource } from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import CustomImage from '../../../components/Image/CustomImage';
import { colors, fonts } from '../../../theme';
import styles from './OnboardingSlides.styles';

interface Item {
  id: number;
  title: string;
  subtitle: string;
  image: number | FastImageSource;
}

interface Props {
  item: Item;
  index: number;
}

const OnboardingSlides = ({ item, index }: Props) => {
  return (
    <View style={[styles.renderItem, {}]}>
      <CustomImage source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};
export default OnboardingSlides;
