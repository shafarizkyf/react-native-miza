import analytics from '@react-native-firebase/analytics';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {AuthNavigationProps} from 'navigations/AuthNavigation';
import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';
import Header from './components/Header';
import Checkbox from 'components/Checkbox';
import Modal from 'components/Modal';
import SignupValidation from './validation/SignupValidation';
import {getJoiFormError} from 'utils/functions';
import RenderIf from 'components/RenderIf';

const SignupScreen = ({navigation}: {navigation: AuthNavigationProps}) => {
  const [showTnc, setShowTnc] = useState<boolean>(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isAgreeTnc, setIsAgreeTnc] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    onCheckTnc?: string;
  }>({});

  const onChange = (key: keyof typeof form, value: string) => {
    const cForm = {...form};
    cForm[key] = value;
    setForm(cForm);
  };

  const onSignUp = () => {
    const validation = SignupValidation.validate(
      {
        ...form,
        onCheckTnc: isAgreeTnc,
      },
      // check all attributes validation instead of returning 1 that failed
      {abortEarly: false},
    );

    if (validation.error) {
      setErrors(getJoiFormError(validation.error.details));
    } else {
      setErrors({});
      analytics().logSignUp({
        method: 'email',
      });

      navigation.navigate('OTPScreen');
    }
  };

  return (
    <View style={[style.p20, style.mt30]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Create Account" subtitle="Welcome to our platform" />
        <TextInput
          label="First Name"
          value={form.firstName}
          onChangeText={value => onChange('firstName', value)}
          errorMessage={errors.firstName}
        />
        <TextInput
          label="Last Name"
          value={form.lastName}
          onChangeText={value => onChange('lastName', value)}
          errorMessage={errors.lastName}
        />
        <TextInput
          label="Email"
          value={form.email}
          onChangeText={value => onChange('email', value)}
          errorMessage={errors.email}
        />
        <TextInput
          label="Password"
          value={form.password}
          textInputProps={{secureTextEntry: true}}
          onChangeText={value => onChange('password', value)}
          errorMessage={errors.password}
        />
        <View style={style.mb40}>
          <View style={styles.tncContainer}>
            <Checkbox onChange={setIsAgreeTnc} />
            <Text>I agree to the</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowTnc(true)}>
              <Text style={styles.termAndCondition}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
          <RenderIf isTrue={!!errors.onCheckTnc}>
            <Text style={style.errorMessage}>{errors.onCheckTnc}</Text>
          </RenderIf>
        </View>
        <Button label="Sign Up" onPress={onSignUp} />
        <View style={styles.signupContainer}>
          <Text style={styles.muted}>Already have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        title="Terms and Conditions"
        show={showTnc}
        toogle={() => setShowTnc(false)}>
        <Text>Lorem ipsum</Text>
      </Modal>
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
  },
  termAndCondition: {
    color: color.primary,
    fontFamily: fontFamily.bold,
    marginLeft: 3,
  },
});

export default SignupScreen;
