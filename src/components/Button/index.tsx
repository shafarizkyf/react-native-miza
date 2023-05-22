import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Text from 'components/Text';
import color from 'styles/color';

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const Button = ({label, style: containerStyle, onPress}: Props) => (
  <TouchableOpacity
    style={[style.button, containerStyle]}
    activeOpacity={0.8}
    onPress={onPress}>
    <Text bold style={style.text}>
      {label}
    </Text>
  </TouchableOpacity>
);

const style = StyleSheet.create({
  button: {
    backgroundColor: color.primary,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Button;
