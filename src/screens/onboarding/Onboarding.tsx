import React, { memo, useCallback, useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Source as FastImageSource } from 'react-native-fast-image';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingSlides from '../../components/Lists/onboarding/OnboardingSlides';
import { onboardingData } from '../../data/onboardingData';
import styles from './Onboarding.styles';

const { height, width } = Dimensions.get('screen');

interface Props {
  navigation: any;
}

interface Item {
  id: number;
  title: string;
  subtitle: string;
  image: number | FastImageSource;
}

const Onboarding = ({ navigation }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<Item[]>(onboardingData || []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return <OnboardingSlides item={item} index={index} />;
    },
    [data],
  );

  const goTo = (i: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index: i, animated: true });
      setSelectedIndex(i);
    }
  };

  const handleNext = () => {
    if (selectedIndex < data.length - 1) {
      goTo(selectedIndex + 1);
    }
  };

  const handleSkip = () => {
    console.log(selectedIndex);
    if (selectedIndex === 2) {
      navigation.navigate('login');
    } else {
      goTo(data.length - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="onboarding-screen">
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={height / 1.3}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
      <View style={styles.controls}>
        {selectedIndex < data.length && (
          <View style={styles.btnView}>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.btn}>
                {selectedIndex !== 2 ? 'Skip' : 'Get Started'}
              </Text>
            </TouchableOpacity>
            {selectedIndex !== 2 && (
              <TouchableOpacity onPress={handleNext}>
                <Text style={styles.btn}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default memo(Onboarding);
