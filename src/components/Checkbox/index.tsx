import {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from 'styles/color';

type Props = {
  active: boolean;
  onChange?: (isActive: boolean) => void;
};

const Checkbox = ({active, onChange}: Props) => {
  const [toggle, setToggle] = useState<boolean>(active);

  const onToggle = () => {
    setToggle(prev => !prev);
  };

  useEffect(() => {
    if (onChange) {
      onChange(toggle);
    }
  }, [toggle]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style.container, toggle ? {borderColor: color.primary} : {}]}
      onPress={onToggle}>
      <Icon
        name="checkmark"
        color={toggle ? color.primary : color.textInputLabel}
        size={14}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 1,
    borderColor: color.textInputLabel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

Checkbox.defaultProps = {
  active: false,
};

export default Checkbox;
