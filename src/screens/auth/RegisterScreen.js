import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { register } from '../../services/AuthService';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // 🔹 Validasi form pakai Yup
  const schema = Yup.object().shape({
    name: Yup.string().required('Nama wajib diisi'),
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Konfirmasi password tidak sama')
      .required('Konfirmasi wajib diisi'),
  });

  // 🔹 Hook form
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  // 🔹 Handle submit register
  const onSubmit = async (data) => {
    try {
      await register(data);
      alert('Registrasi berhasil, silakan login!');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error.response?.data);
      alert('Registrasi gagal. Coba cek data yang dimasukkan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Name Input */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nama"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
            error={errors.name}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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

      {/* Password Confirmation Input */}
      <Controller
        control={control}
        name="password_confirmation"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Konfirmasi Password"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            error={errors.password_confirmation}
            right={
                <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
            }
            />
        )}
      />
      {errors.password_confirmation && <Text style={styles.error}>{errors.password_confirmation.message}</Text>}

      {/* Register Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        style={styles.button}
      >
        Register
      </Button>

      {/* Link ke Login */}
      <Button onPress={() => navigation.navigate('Login')}>Sudah punya akun? Login</Button>
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
