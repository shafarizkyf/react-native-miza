import {
  TextInput as TextInputRN,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Text from 'components/Text';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  textInputProps?: TextInputProps;
  containerStyle?: ViewStyle;
};

const TextInput = ({
  label,
  value,
  containerStyle,
  placeholder,
  textInputProps,
}: Props) => (
  <View style={[style.container, containerStyle]}>
    <Text style={style.label}>{label}</Text>
    <TextInputRN
      style={style.textInput}
      value={value}
      placeholder={placeholder}
      {...textInputProps}
    />
  </View>
);

const style = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: color.textInputLabel,
    marginBottom: 5,
    fontSize: 12,
  },
  textInput: {
    fontFamily: fontFamily.semiBold,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.textInputLabel,
    color: color.dark,
  },
});

export default TextInput;
