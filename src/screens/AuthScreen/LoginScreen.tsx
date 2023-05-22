import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';

const LoginScreen = () => {
  return (
    <View style={[style.p20, style.mt30]}>
      <View style={style.mb30}>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.muted}>Sign In to continue</Text>
      </View>
      <TextInput label="Email" value="shafarizkyf@gmail.com" />
      <TextInput
        label="Password"
        value=""
        textInputProps={{secureTextEntry: true}}
      />
      <TouchableOpacity activeOpacity={0.6} style={style.mb50}>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
      <Button label="Login" />
      <View style={styles.signupContainer}>
        <Text style={styles.muted}>New User?</Text>
        <TouchableOpacity activeOpacity={0.6}>
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
  welcome: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
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
