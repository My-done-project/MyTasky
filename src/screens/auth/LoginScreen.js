import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../services/AuthService';
import { setItem } from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);


  // 🔹 Validasi form pakai Yup
  const schema = Yup.object().shape({
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
  });

  // 🔹 Hook form
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  // 🔹 Handle submit login
  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      await setItem('token', response.data.token);
      navigation.replace('Home'); // replace biar ga bisa balik ke login
    } catch (error) {
      console.log(error.response.data);
      alert('Login gagal. Cek email dan password!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
            error={errors.email}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            secureTextEntry={!showPassword}
            style={styles.input}
            error={errors.password}
            right={
                <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                />
            }
            />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Login Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.button}
      >
        Login
      </Button>

      {/* Register Link */}
      <Button onPress={() => navigation.navigate('Register')}>Belum punya akun? Register</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  error: { color: 'red', marginBottom: 8 },
});
