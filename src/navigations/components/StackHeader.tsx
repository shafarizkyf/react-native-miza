import {StackHeaderProps} from '@react-navigation/stack';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from 'styles/color';

const StackHeader = ({navigation}: StackHeaderProps) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.backIcon}
      onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}>
      <Icon name="chevron-back" size={22} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.stackCardColor,
    height: 60,
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
});

export default StackHeader;
