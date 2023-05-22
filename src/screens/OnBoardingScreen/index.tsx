import React, {useContext, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import color from 'styles/color';
import Text from 'components/Text';
import Slider from './components/Slider';
import Pagination from './components/Pagination';
import AppContext from 'context/AppContext';

const {width: wWidth, height: wHeight} = Dimensions.get('window');

const SLIDERS = [
  {
    title: 'On Boarding Title 1',
    subtitle:
      'Get an overview of how you are performing and motivate yourself to achieve something',
  },
  {
    title: 'On Boarding Title 2',
    subtitle:
      'Get an overview of how you are performing and motivate yourself to achieve something',
  },
  {
    title: 'On Boarding Title 3',
    subtitle:
      'Get an overview of how you are performing and motivate yourself to achieve something',
  },
];

const OnBoardingScreen = () => {
  const {setHasOnBoard} = useContext(AppContext);
  const carouselRef = useRef<ICarouselInstance>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [progressiveIndex, setProgressiveIndex] = useState<number>(0);

  const continueOrSkip = () => {
    if (carouselRef.current) {
      setHasOnBoard(true);
    }
  };

  // to manipulate width of indicator color
  const onProgressChange = (offset: number, absoluteProgress: number) => {
    setProgressiveIndex(absoluteProgress);
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={continueOrSkip}>
        <Text style={style.skip}>{`${
          activeIndex === SLIDERS.length - 1 ? 'Continue' : 'Skip'
        }`}</Text>
      </TouchableOpacity>
      <GestureHandlerRootView>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={wWidth}
          height={wHeight - 150}
          data={SLIDERS}
          onSnapToItem={setActiveIndex}
          onProgressChange={onProgressChange}
          renderItem={({item}) => (
            <Slider title={item.title} subtitle={item.subtitle} />
          )}
        />
      </GestureHandlerRootView>
      <View style={style.dots}>
        {SLIDERS.map((_, index) => (
          <Pagination
            key={`Pagination-${index}`}
            activeIndex={progressiveIndex}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    flex: 1,
  },
  skip: {
    textAlign: 'right',
    marginTop: 50,
    marginBottom: 30,
    marginHorizontal: 30,
    color: '#fff',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 20,
    width: 30,
  },
});

export default OnBoardingScreen;
