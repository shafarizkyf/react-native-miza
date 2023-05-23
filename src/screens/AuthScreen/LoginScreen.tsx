import analytics from '@react-native-firebase/analytics';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {AuthNavigationProps} from 'navigations/AuthNavigation';
import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';
import Header from './components/Header';
import LoginValidation from './validation/LoginValidation';
import {getJoiFormError} from 'utils/functions';
import AppContext from 'context/AppContext';
import localStorage, {STORAGE_KEYS} from 'utils/localStorage';

const LoginScreen = ({navigation}: {navigation: AuthNavigationProps}) => {
  const {setUser} = useContext(AppContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const onLogin = () => {
    const validation = LoginValidation.validate(
      {
        email,
        password,
      },
      {abortEarly: false},
    );

    if (validation.error) {
      setErrors(getJoiFormError(validation.error.details));
    } else {
      analytics().logLogin({
        method: 'email',
      });

      setErrors({});
      Promise.resolve(localStorage.set(STORAGE_KEYS.USER, email)).then(() => {
        setUser(email);
      });
    }
  };

  return (
    <View style={[style.flex1, style.p20, style.mt30]}>
      <Header title="Greetings!" subtitle="Please sign-in to continue" />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        textInputProps={{keyboardType: 'email-address'}}
        errorMessage={errors.email}
      />
      <TextInput
        label="Password"
        value={password}
        textInputProps={{secureTextEntry: true}}
        onChangeText={setPassword}
        errorMessage={errors.password}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={style.mb50}
        onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
      <Button label="Login" onPress={onLogin} />
      <View style={styles.signupContainer}>
        <Text style={styles.muted}>New User?</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signup}>Signup</Text>
        </TouchableOpacity>
      </View>
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

export default LoginScreen;
