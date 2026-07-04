import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBrand, type } from '../theme/ThemeContext';

export default function SplashScreen({ navigation }) {
  const brand = useBrand();

  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Login'), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: brand.colors.primary }]}>
      <View style={styles.logoMark}>
        <Text style={[styles.logoInitial, { color: brand.colors.primary }]}>
          {brand.logoInitial}
        </Text>
      </View>
      <Text style={[type.h1, styles.appName]}>{brand.appName}</Text>
      <Text style={styles.tagline}>{brand.tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMark: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoInitial: {
    fontSize: 40,
    fontWeight: '800',
  },
  appName: {
    color: '#fff',
    marginBottom: 6,
  },
  tagline: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
});
