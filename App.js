import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { AuthProvider } from './src/navigation/AuthContext';
import { ChatSettingsProvider } from './src/navigation/ChatSettingsContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    // Provider order matters: gesture/safe-area wrap the whole native tree,
    // then Theme (brand config) before Auth/ChatSettings since those screens
    // read brand colors, and RootNavigator is innermost since it consumes all three.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <ChatSettingsProvider>
              <StatusBar style="dark" />
              <RootNavigator />
            </ChatSettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
