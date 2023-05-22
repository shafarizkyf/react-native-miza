import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'components/Text';
import color from 'styles/color';

type Props = {
  label: string;
};

const Button = ({label}: Props) => (
  <TouchableOpacity style={style.button} activeOpacity={0.8}>
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
