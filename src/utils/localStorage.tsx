import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  ONBOARDING: 'onboarding',
  USER: 'user',
};

const set = async (key: string, data: any) => {
  try {
    const value = JSON.stringify(data);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const get = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export default {
  set,
  get,
  remove,
};
