import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';

export default function ForgotPasswordScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
      </TouchableOpacity>

      {!sent ? (
        <>
          <View style={[styles.iconCircle, { backgroundColor: c.primaryLight }]}>
            <Ionicons name="key-outline" size={28} color={c.primary} />
          </View>
          <Text style={[type.h1, { color: c.textPrimary, marginBottom: spacing.xs }]}>
            Reset your password
          </Text>
          <Text style={[type.body, { color: c.textSecondary, marginBottom: spacing.xl }]}>
            Enter the email linked to your account and we'll send a reset link.
          </Text>
          <Text style={[styles.label, { color: c.textSecondary }]}>Email</Text>
          <TextInput
            style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={c.textSecondary}
          />
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: c.primary }]}
            onPress={() => setSent(true)}
          >
            <Text style={styles.primaryButtonText}>Send reset link</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <View style={[styles.iconCircle, { backgroundColor: c.primaryLight }]}>
            <Ionicons name="checkmark-circle" size={32} color={c.success} />
          </View>
          <Text style={[type.h2, { color: c.textPrimary, marginBottom: spacing.xs, textAlign: 'center' }]}>
            Check your email
          </Text>
          <Text style={[type.body, { color: c.textSecondary, textAlign: 'center', marginBottom: spacing.xl }]}>
            We sent a password reset link to {email || 'your email'}.
          </Text>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: c.primary, width: '100%' }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Back to login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, paddingTop: 60 },
  backBtn: { marginBottom: spacing.lg },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
  },
  primaryButton: {
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
