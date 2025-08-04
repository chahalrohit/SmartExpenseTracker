import React from 'react';
import { View } from 'react-native';
import { Source as FastImageSource } from 'react-native-fast-image';
import CustomImage from '../../../components/Image/CustomImage';
import CustomText from '../../CustomText/CustomText';
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

const OnboardingSlides = ({ item }: Props) => {
  return (
    <View style={[styles.renderItem, {}]}>
      <CustomImage source={item.image} style={styles.image} />
      <CustomText style={styles.title}>{item.title}</CustomText>
      <CustomText style={styles.subtitle}>{item.subtitle}</CustomText>
    </View>
  );
};
export default OnboardingSlides;
