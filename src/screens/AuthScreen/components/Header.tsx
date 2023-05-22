import Text from 'components/Text';
import {View, StyleSheet} from 'react-native';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';
import style from 'styles/style';

type Props = {
  title: string;
  subtitle: string;
};

const Header = ({title, subtitle}: Props) => (
  <View style={style.mb30}>
    <Text style={styles.welcome}>{title}</Text>
    <Text style={styles.muted}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  welcome: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
  },
  muted: {
    color: color.textInputLabel,
  },
});

export default Header;
