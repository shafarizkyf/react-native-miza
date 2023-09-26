import React from 'react';
import {View, StyleSheet} from 'react-native';
import {clamp} from 'utils/functions';

type Props = {
  activeColor: string;
  inactiveColor: string;
  activeIndex: number;
  length: number;
};

const Pagination = ({
  activeColor,
  inactiveColor,
  activeIndex,
  length,
}: Props) => {
  const getProgressIndicator = (index: number) => {
    if (index === 0) {
      return 1;
    }
    if (index < length) {
      return clamp(activeIndex - (index - 1), 0, 1);
    }

    return 0;
  };

  return (
    <>
      {new Array(length).fill('').map((_, i) => (
        <View
          style={[styles.dot, {backgroundColor: inactiveColor}]}
          key={`dot-${i}`}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: activeColor,
                width: 5 * getProgressIndicator(i),
              },
            ]}
          />
        </View>
      ))}
    </>
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
