import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand } from '../theme/ThemeContext';

// Shared avatar used by every list row, header, and profile screen.
// Rendering precedence: group icon > photo > initials, so callers can pass
// all three props and let this component pick the right one.
export default function Avatar({ initials, color, photoUrl, isGroup, size = 48, online, style }) {
  const brand = useBrand();
  return (
    <View style={[{ width: size, height: size }, style]}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color || brand.colors.primary,
            overflow: 'hidden',
          },
        ]}
      >
        {isGroup ? (
          <Ionicons name="people" size={size * 0.52} color="#fff" />
        ) : photoUrl ? (
          <Image source={{ uri: photoUrl }} style={{ width: size, height: size }} resizeMode="cover" />
        ) : (
          <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
        )}
      </View>
      {/* Presence dot only renders when the caller passes a boolean — groups
          intentionally pass `undefined` since they have no single online state. */}
      {online !== undefined && (
        <View
          style={[
            styles.dot,
            {
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
              backgroundColor: online ? brand.colors.success : '#B7C0BE',
              right: -1,
              bottom: -1,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#fff',
    fontWeight: '700',
  },
  dot: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
