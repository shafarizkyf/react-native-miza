import {
  TextInput as TextInputRN,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Text from 'components/Text';
import Icon from 'react-native-vector-icons/Feather';
import color from 'styles/color';
import styles from 'styles/style';
import fontFamily from 'styles/fontFamily';
import RenderIf from 'components/RenderIf';
import {useState} from 'react';

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  textInputProps?: TextInputProps;
  containerStyle?: ViewStyle;
  errorMessage?: string;
};

const TextInput = ({
  label,
  value,
  containerStyle,
  placeholder,
  onChangeText,
  textInputProps,
  errorMessage,
}: Props) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
    textInputProps?.secureTextEntry || false,
  );

  return (
    <View style={[style.container, containerStyle]}>
      <Text style={style.label}>{label}</Text>
      <View style={style.textInputContainer}>
        <TextInputRN
          style={style.textInput}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          {...textInputProps}
          secureTextEntry={secureTextEntry}
        />
        <RenderIf isTrue={textInputProps?.secureTextEntry !== undefined}>
          <TouchableOpacity onPress={() => setSecureTextEntry(prev => !prev)}>
            <Icon
              name={!secureTextEntry ? 'eye' : 'eye-off'}
              color={color.textInputLabel}
              size={16}
            />
          </TouchableOpacity>
        </RenderIf>
      </View>
      <RenderIf isTrue={!!errorMessage?.length}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </RenderIf>
    </View>
  );
};

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
    color: color.dark,
    paddingBottom: 10,
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.textInputLabel,
    alignItems: 'center',
  },
});

export default TextInput;
