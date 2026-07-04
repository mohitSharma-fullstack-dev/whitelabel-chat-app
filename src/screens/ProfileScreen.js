import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { currentUser } from '../data/users';
import { useAuth } from '../navigation/AuthContext';

const MENU = [
  { icon: 'person-outline', label: 'Edit profile', route: 'EditProfile' },
  { icon: 'settings-outline', label: 'Settings', route: 'Settings' },
  { icon: 'shield-checkmark-outline', label: 'Privacy & security' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'help-circle-outline', label: 'Help & support' },
];

export default function ProfileScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const { signOut } = useAuth();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.background }} contentContainerStyle={styles.scroll}>
      <Text style={[type.h1, { color: c.textPrimary, marginBottom: spacing.xl }]}>Profile</Text>

      <View style={styles.hero}>
        <Avatar
          initials={currentUser.initials}
          color={currentUser.avatarColor}
          size={90}
          photoUrl={currentUser.avatarUrl}
        />
        <Text style={[type.h2, { color: c.textPrimary, marginTop: spacing.md }]}>
          {currentUser.name === 'You' ? 'Jordan Lee' : currentUser.name}
        </Text>
        <Text style={{ color: c.textSecondary, marginTop: 4 }}>{currentUser.status}</Text>
        <View style={[styles.brandPill, { backgroundColor: c.primaryLight }]}>
          <Text style={{ color: c.primary, fontSize: 12, fontWeight: '600' }}>
            {brand.appName} member
          </Text>
        </View>
      </View>

      <View style={[styles.menuCard, { backgroundColor: c.surface, borderColor: c.border }]}>
        {MENU.map((item, idx) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuRow, idx !== MENU.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border }]}
            onPress={() => item.route && navigation.navigate(item.route)}
          >
            <Ionicons name={item.icon} size={19} color={c.primary} />
            <Text style={[type.body, { color: c.textPrimary, flex: 1, marginLeft: 14 }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={17} color={c.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutRow} onPress={() => signOut()}>
        <Ionicons name="log-out-outline" size={19} color={c.danger} />
        <Text style={{ color: c.danger, fontWeight: '600', marginLeft: 10 }}>Log out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>{brand.appName} v1.0.0 · Powered by {brand.appName}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingTop: 60, paddingBottom: 40 },
  hero: { alignItems: 'center', marginBottom: spacing.xl },
  brandPill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.pill, marginTop: 10 },
  menuCard: { borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: spacing.md },
  logoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
  version: { textAlign: 'center', color: '#9AA6A3', fontSize: 11, marginTop: spacing.xl },
});
