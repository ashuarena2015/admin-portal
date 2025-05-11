// App.tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './app/_layout'; // adjust path if needed

export default function App() {
  return (
    <NavigationContainer>
        <RootLayout />
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}
