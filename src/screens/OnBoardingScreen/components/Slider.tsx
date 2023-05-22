import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Text from 'components/Text';
import styles from 'styles/style';

const {width: wWidth, height: wHeight} = Dimensions.get('window');

type Props = {
  title: string;
  subtitle: string;
};

const Slider = ({title, subtitle}: Props) => {
  return (
    <View>
      <View style={style.card} />
      <View style={[styles.alignItemsCenter, styles.ph40]}>
        <Text semiBold white center style={style.title}>
          {title}
        </Text>
        <Text light white center>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  skip: {
    textAlign: 'right',
    marginTop: 50,
    marginBottom: 30,
    marginHorizontal: 30,
    color: '#fff',
  },
  card: {
    width: wWidth - 80,
    height: wHeight / 1.8,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
});

export default Slider;
