import React, { createContext, useContext } from 'react';
import brand from './brand.json';

// In production, `brand` would be fetched once at app launch from the
// admin-configured endpoint (e.g. GET /config/branding) and cached locally.
// For this static demo it's bundled as JSON so every screen can react to it.

const ThemeContext = createContext(brand);

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={brand}>{children}</ThemeContext.Provider>
  );
}

export function useBrand() {
  return useContext(ThemeContext);
}

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const radius = { sm: 8, md: 14, lg: 20, pill: 999 };

export const type = {
  h1: { fontSize: 28, fontWeight: '700' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 17, fontWeight: '600' },
  body: { fontSize: 15, fontWeight: '400' },
  bodyMedium: { fontSize: 15, fontWeight: '600' },
  caption: { fontSize: 13, fontWeight: '400' },
  small: { fontSize: 11, fontWeight: '500' },
};
