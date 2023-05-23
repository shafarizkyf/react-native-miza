import analytics from '@react-native-firebase/analytics';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import {AuthNavigationProps} from 'navigations/AuthNavigation';
import {useState} from 'react';
import {View} from 'react-native';
import style from 'styles/style';
import Header from './components/Header';
import ForgotPasswordValidation from './validation/ForgotPasswordValidation';
import {getJoiFormError} from 'utils/functions';

type Props = {
  navigation: AuthNavigationProps;
};

const ForgotPasswordScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{email?: string}>({});

  const onSend = () => {
    const validation = ForgotPasswordValidation.validate(
      {email},
      // check all attributes validation instead of returning 1 that failed
      {abortEarly: false},
    );

    if (validation.error) {
      setErrors(getJoiFormError(validation.error.details));
    } else {
      setErrors({});
      analytics().logEvent('ForgotPassword', {
        email,
      });

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
        errorMessage={errors.email}
      />
      <Button label="Send" onPress={onSend} />
    </View>
  );
};

export default ForgotPasswordScreen;
