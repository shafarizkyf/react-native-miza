import React, {ReactNode} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';
import fontFamily from 'styles/fontFamily';

type Props = {
  style?: TextStyle;
  children: ReactNode;
  semiBold?: boolean;
  light?: boolean;
  white?: boolean;
  center?: boolean;
  bold?: boolean;
};

const Text = ({
  style: customStyle,
  children,
  semiBold,
  light,
  white,
  center,
  bold,
}: Props) => (
  <RNText
    style={[
      style.text,
      semiBold && style.textSemiBold,
      light && style.textLight,
      white && style.textWhite,
      center && style.textCenter,
      bold && style.textBold,
      customStyle,
    ]}>
    {children}
  </RNText>
);

const style = StyleSheet.create({
  text: {
    fontFamily: fontFamily.regular,
  },
  textBold: {
    fontFamily: fontFamily.bold,
  },
  textSemiBold: {
    fontFamily: fontFamily.semiBold,
  },
  textLight: {
    fontFamily: fontFamily.light,
  },
  textWhite: {
    color: '#fff',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default Text;
