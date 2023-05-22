import Button from 'components/Button';
import TextInput from 'components/TextInput';
import {AuthNavigationProps} from 'navigations/AuthNavigation';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';
import Header from './components/Header';
import ForgotPasswordValidation from './validation/ForgotPasswordValidation';

type Props = {
  navigation: AuthNavigationProps;
};

const ForgotPasswordScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState<string>('');

  const onSend = () => {
    const validation = ForgotPasswordValidation.validate(
      {email},
      // check all attributes validation instead of returning 1 that failed
      {abortEarly: false},
    );

    if (validation.error) {
      console.log('validation.error', validation.error.details);
    } else {
      navigation.navigate('OTPScreen');
    }
  };

  return (
    <View style={[style.ph20, style.mt10]}>
      <Header
        title="Forgot Password"
        subtitle="Please type your email address to send the code verification"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        textInputProps={{keyboardType: 'email-address'}}
      />
      <Button label="Send" onPress={onSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: 14,
    textAlign: 'right',
    color: color.textInputLabel,
  },
  muted: {
    color: color.textInputLabel,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  signup: {
    color: color.primary,
    fontFamily: fontFamily.bold,
    marginLeft: 3,
  },
});

export default ForgotPasswordScreen;
