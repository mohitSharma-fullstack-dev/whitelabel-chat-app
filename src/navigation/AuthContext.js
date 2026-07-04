import React, { createContext, useContext, useMemo, useState } from 'react';

// Mock auth: no token, no backend call — signIn()/signOut() just flip a boolean.
// RootNavigator reads isSignedIn to decide between AuthStack and MainTabs.
// Swap this for real session handling (token storage, refresh, etc.) when the API exists.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const value = useMemo(
    () => ({
      isSignedIn,
      signIn: () => setIsSignedIn(true),
      signOut: () => setIsSignedIn(false),
    }),
    [isSignedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
