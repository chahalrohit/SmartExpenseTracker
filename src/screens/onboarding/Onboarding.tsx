import React, { useState, useEffect, useCallback, memo } from 'react';
import { FlatList, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './Onboarding.styles';
import CustomImage from '../../components/Image/CustomImage';
import images from '../../assets/images';
import { scale } from 'react-native-size-matters';
import { colors } from '../../utils';

const { height, width } = Dimensions.get('screen');

const Onboarding = () => {
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      title: 'Track Expenses Instantly',
      subtitle:
        'We automatically detect and extract bank transactions from your SMS messages — no manual entry needed!',
      image: images.onboarding1,
    },
    {
      id: 2,
      title: 'Visualize Your Spending',
      subtitle:
        'See your monthly expenses, recent transactions, and category-wise insights — all in one place.',
      image: images.onboarding2,
    },
    {
      id: 3,
      title: 'Secure & Customizable',
      subtitle:
        'Add your own expenses manually, and keep everything private — your data stays on your phone.',
      image: images.onboarding3,
    },
  ]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={[
          styles.renderItem,
          {
            backgroundColor: index === 2 ? colors.pearlWhite : colors.splashBG,
          },
        ]}
      >
        <CustomImage
          source={item.image}
          style={{ height: height, width: width }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default memo(Onboarding);
