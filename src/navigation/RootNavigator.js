import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuth } from './AuthContext';

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    // Top-level auth gate: swaps the entire navigator tree rather than
    // guarding individual routes, so signed-out users can't deep-link into MainTabs.
    <NavigationContainer>
      {isSignedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
