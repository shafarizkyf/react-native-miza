import React, {ReactNode} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';

type Props = {
  style?: TextStyle;
  children: ReactNode;
  semiBold?: boolean;
  light?: boolean;
  white?: boolean;
  center?: boolean;
};

const Text = ({
  style: customStyle,
  children,
  semiBold,
  light,
  white,
  center,
}: Props) => (
  <RNText
    style={[
      style.text,
      semiBold && style.textSemiBold,
      light && style.textLight,
      white && style.textWhite,
      center && style.textCenter,
      customStyle,
    ]}>
    {children}
  </RNText>
);

const style = StyleSheet.create({
  text: {
    fontFamily: 'PlusJakartaSans-Regular',
  },
  textSemiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  textLight: {
    fontFamily: 'PlusJakartaSans-Light',
  },
  textWhite: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default Text;
