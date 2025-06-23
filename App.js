import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
}
