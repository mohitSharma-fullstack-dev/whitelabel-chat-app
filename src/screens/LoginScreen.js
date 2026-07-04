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

// UI-only login: `signIn()` immediately flips the mock auth flag — there's no
// credential check, network call, or error state. Google/Apple buttons are
// non-functional placeholders for the real OAuth flow.
export default function LoginScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const { signIn } = useAuth();
  const [email, setEmail] = useState('you@nimbus.app');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.logoMark, { backgroundColor: c.primary }]}>
          <Text style={styles.logoInitial}>{brand.logoInitial}</Text>
        </View>
        <Text style={[type.h1, { color: c.textPrimary, marginBottom: spacing.xs }]}>
          Welcome back
        </Text>
        <Text style={[type.body, { color: c.textSecondary, marginBottom: spacing.xl }]}>
          Log in to keep chatting with your team.
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

        <Text style={[styles.label, { color: c.textSecondary }]}>Password</Text>
        <View style={[styles.input, styles.passwordRow, { borderColor: c.border }]}>
          <TextInput
            style={{ flex: 1, color: c.textPrimary, fontSize: 15 }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            placeholder="••••••••"
            placeholderTextColor={c.textSecondary}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={c.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginTop: spacing.sm }}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={{ color: c.primary, fontWeight: '600', fontSize: 13 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: c.primary }]}
          onPress={() => signIn()}
        >
          <Text style={styles.primaryButtonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: c.border }]} />
          <Text style={{ color: c.textSecondary, marginHorizontal: spacing.md, fontSize: 12 }}>
            OR CONTINUE WITH
          </Text>
          <View style={[styles.divider, { backgroundColor: c.border }]} />
        </View>

        <TouchableOpacity style={[styles.socialButton, { borderColor: c.border }]}>
          <Ionicons name="logo-google" size={18} color={c.textPrimary} />
          <Text style={[styles.socialButtonText, { color: c.textPrimary }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, { borderColor: c.border }]}>
          <Ionicons name="logo-apple" size={20} color={c.textPrimary} />
          <Text style={[styles.socialButtonText, { color: c.textPrimary }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={{ color: c.textSecondary }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: c.primary, fontWeight: '700' }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: spacing.xl, paddingTop: 72 },
  logoMark: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoInitial: { color: '#fff', fontSize: 26, fontWeight: '800' },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: spacing.md },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  primaryButton: {
    borderRadius: radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xl },
  divider: { flex: 1, height: 1 },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingVertical: 13,
    marginBottom: spacing.md,
    gap: 10,
  },
  socialButtonText: { fontSize: 15, fontWeight: '600' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
