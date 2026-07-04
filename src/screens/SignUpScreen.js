import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import { useAuth } from '../navigation/AuthContext';

export default function SignUpScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>

        <Text style={[type.h1, { color: c.textPrimary, marginBottom: spacing.xs }]}>
          Create your account
        </Text>
        <Text style={[type.body, { color: c.textSecondary, marginBottom: spacing.xl }]}>
          Join {brand.appName} in less than a minute.
        </Text>

        <Text style={[styles.label, { color: c.textSecondary }]}>Full name</Text>
        <TextInput
          style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
          value={name}
          onChangeText={setName}
          placeholder="Jordan Lee"
          placeholderTextColor={c.textSecondary}
        />

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

        <Text style={[styles.label, { color: c.textSecondary }]}>Password</Text>
        <TextInput
          style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="At least 8 characters"
          placeholderTextColor={c.textSecondary}
        />

        <Text style={[styles.terms, { color: c.textSecondary }]}>
          By continuing, you agree to {brand.appName}'s Terms of Service and Privacy Policy.
        </Text>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: c.primary }]}
          onPress={() => signIn()}
        >
          <Text style={styles.primaryButtonText}>Create account</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={{ color: c.textSecondary }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: c.primary, fontWeight: '700' }}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: spacing.xl, paddingTop: 60 },
  backBtn: { marginBottom: spacing.lg },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: spacing.md },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
  },
  terms: { fontSize: 12, marginTop: spacing.lg, lineHeight: 18 },
  primaryButton: {
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
