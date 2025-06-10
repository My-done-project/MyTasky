import React from 'react';
import { View, Text, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Register Screen</Text>
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
