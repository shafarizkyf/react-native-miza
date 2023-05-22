import RenderIf from 'components/RenderIf';
import Text from 'components/Text';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import color from 'styles/color';

const Spinner = ({label}: {label?: string}) => (
  <View style={style.container}>
    <ActivityIndicator color={color.primary} />
    <RenderIf isTrue={!!label?.length}>
      <Text style={style.text}>{label}</Text>
    </RenderIf>
  </View>
);

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 2,
  },
  text: {
    color: color.primary,
    fontSize: 12,
    marginTop: 5,
  },
});

export default Spinner;
