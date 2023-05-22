import Text from 'components/Text';
import {ReactElement} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import RNModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import color from 'styles/color';
import fontFamily from 'styles/fontFamily';

type Props = {
  show: boolean;
  title: string;
  children: ReactElement;
  toogle: () => void;
};

const Modal = ({title, show, children, toogle}: Props) => (
  <RNModal
    isVisible={show}
    onBackButtonPress={toogle}
    backdropOpacity={0.5}
    onBackdropPress={toogle}>
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.title}>{title}</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={toogle}>
          <View style={style.closeBox}>
            <Icon name="close" size={18} color={color.textInputLabel} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.body}>{children}</View>
    </View>
  </RNModal>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 50,
    marginHorizontal: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.textInputLabel,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeBox: {
    padding: 10,
    paddingRight: 0,
  },
  body: {
    padding: 20,
  },
  title: {
    color: color.dark,
    fontSize: 16,
    fontFamily: fontFamily.bold,
  },
});

Modal.defaultProps = {
  title: '',
  show: false,
  toogle: () => null,
};

export default Modal;
