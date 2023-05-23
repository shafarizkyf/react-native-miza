import {View, Dimensions, StyleSheet} from 'react-native';
import {MotiImage} from 'moti';
import {
  SPLASH_SCREEN_DELAY_DURATION,
  SPLASH_SCREEN_TRANSITION_OUT_DURATION,
} from '../../config/splashscreen';
import style from 'styles/style';

const {width: WIDTH} = Dimensions.get('window');

const SplashScreen = () => (
  <View style={[style.flex1, style.alignItemsCenter]}>
    <MotiImage
      source={require('images/logo.png')}
      style={styles.logo}
      animate={{
        scale: [
          {value: 0},
          {value: 1},
          {
            value: 0,
            delay: SPLASH_SCREEN_DELAY_DURATION,
            duration: SPLASH_SCREEN_TRANSITION_OUT_DURATION,
          },
        ],
        opacity: [
          {value: 0},
          {value: 1},
          {
            value: 0,
            delay: SPLASH_SCREEN_DELAY_DURATION,
            duration: SPLASH_SCREEN_TRANSITION_OUT_DURATION,
          },
        ],
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    width: WIDTH / 2,
    height: undefined,
    flex: 1,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
