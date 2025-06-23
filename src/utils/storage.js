import AsyncStorage from '@react-native-async-storage/async-storage';

// Simpan data
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error storing item', e);
  }
};

// Ambil data
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error reading item', e);
  }
};

// Hapus data
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing item', e);
  }
};
