import Button from 'components/Button';
import Text from 'components/Text';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {useTimer} from 'react-timer-hook';
import dayjs from 'dayjs';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';
import Header from './components/Header';
import RenderIf from 'components/RenderIf';

const COUNTDOWN = 30;

const OTPScreen = () => {
  const {seconds, start, restart} = useTimer({
    expiryTimestamp: dayjs().add(COUNTDOWN, 'second').toDate(),
  });

  const resend = () => {
    restart(dayjs().add(COUNTDOWN, 'second').toDate(), true);
  };

  const handleOtp = (code: string) => {
    console.log(code);
  };

  return (
    <View style={[style.flex1, style.ph20, style.mt10]}>
      <Header
        title="OTP Verification"
        subtitle="Please enter 6 digits code that has been sent to your email"
      />
      <OtpInputs
        autofillFromClipboard={false}
        numberOfInputs={6}
        handleChange={handleOtp}
        inputStyles={styles.inputText}
        style={styles.otpContainer}
      />
      <View style={[style.mt20, style.row]}>
        <Text>Didn't receive the code?</Text>
        <RenderIf isTrue={seconds > 0}>
          <Text semiBold style={styles.resendOtp}>
            {`Resend in ${seconds}s`}
          </Text>
        </RenderIf>
        <RenderIf isTrue={seconds === 0}>
          <TouchableOpacity activeOpacity={0.5} onPress={resend}>
            <Text semiBold style={styles.resendOtp}>
              Resend
            </Text>
          </TouchableOpacity>
        </RenderIf>
      </View>
      <Button label="Verify" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputText: {
    fontFamily: fontFamily.bold,
    borderBottomWidth: 1,
    borderBottomColor: color.textInputLabel,
    paddingHorizontal: 15,
    paddingBottom: 15,
    fontSize: 22,
  },
  button: {
    marginTop: 50,
  },
  resendOtp: {
    color: color.primary,
    marginLeft: 3,
  },
});

export default OTPScreen;
