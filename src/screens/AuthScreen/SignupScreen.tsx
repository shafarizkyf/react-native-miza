import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {AuthNavigationProps} from 'navigations/AuthNavigation';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';
import Header from './components/Header';
import Checkbox from 'components/Checkbox';

const SignupScreen = ({navigation}: {navigation: AuthNavigationProps}) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onChange = (key: keyof typeof form, value: string) => {
    const cForm = {...form};
    cForm[key] = value;
    setForm(cForm);
  };

  return (
    <View style={[style.p20, style.mt30]}>
      <Header title="Create Account" subtitle="Welcome to our platform" />
      <TextInput
        label="First Name"
        value={form.firstName}
        onChangeText={value => onChange('firstName', value)}
      />
      <TextInput
        label="Last Name"
        value={form.lastName}
        onChangeText={value => onChange('lastName', value)}
      />
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={value => onChange('email', value)}
      />
      <TextInput
        label="Password"
        value={form.password}
        textInputProps={{secureTextEntry: true}}
        onChangeText={value => onChange('password', value)}
      />
      <View style={styles.tncContainer}>
        <Checkbox />
        <Text>I agree to the</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.termAndCondition}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
      <Button label="Sign Up" />
      <View style={styles.signupContainer}>
        <Text style={styles.muted}>Already have an account?</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signup}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  tncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  termAndCondition: {
    color: color.primary,
    fontFamily: fontFamily.bold,
    marginLeft: 3,
  },
});

export default SignupScreen;
