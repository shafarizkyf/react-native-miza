import React from 'react';
import {View, StyleSheet} from 'react-native';
import {clamp} from 'utils/functions';

type Props = {
  activeColor: string;
  inactiveColor: string;
  activeIndex: number;
  index: number;
};

const Pagination = ({
  activeColor,
  inactiveColor,
  index,
  activeIndex,
}: Props) => {
  const getProgressIndicator = () => {
    if (index === 0) {
      return 1;
    }

    if (index === 1) {
      return clamp(activeIndex, 0, 1);
    }

    return clamp(activeIndex - 1, 0, 1);
  };

  return (
    <View style={[styles.dot, {backgroundColor: inactiveColor}]}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: activeColor,
            width: 5 * getProgressIndicator(),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 5,
    height: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

Pagination.defaultProps = {
  activeColor: '#fff',
  inactiveColor: '#D9D9D9',
};

export default Pagination;
