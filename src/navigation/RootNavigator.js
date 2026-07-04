import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuth } from './AuthContext';

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {isSignedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
