import Button from 'components/Button';
import Text from 'components/Text';
import AppContext from 'context/AppContext';
import {useContext} from 'react';
import {View} from 'react-native';
import style from 'styles/style';
import localStorage, {STORAGE_KEYS} from 'utils/localStorage';

const HomeScreen = () => {
  const {setUser} = useContext(AppContext);

  const logout = () => {
    Promise.all([
      localStorage.remove(STORAGE_KEYS.USER),
      localStorage.remove(STORAGE_KEYS.ONBOARDING),
    ]).then(() => {
      setUser(null);
    });
  };

  return (
    <View style={[style.flex1, style.p20]}>
      <Text>Home Screen</Text>
      <Button label="Logout" style={style.mt40} onPress={logout} />
    </View>
  );
};

export default HomeScreen;
