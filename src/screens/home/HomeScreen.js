import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { getItem, removeItem } from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../services/AuthService';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  // 🔹 Ambil token saat screen load
  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await getItem('token');
      if (!savedToken) {
        navigation.replace('Login');
      } else {
        setToken(savedToken);
      }
    };

    fetchToken();
  }, []);

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await logout(token); // panggil API logout
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      await removeItem('token');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat datang di ToDo App 🚀</Text>
      <Text style={styles.subtitle}>Token kamu: {token}</Text>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 14, marginBottom: 30, textAlign: 'center' },
  button: { marginTop: 20 },
});
