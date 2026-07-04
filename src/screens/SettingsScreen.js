import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import { useAuth } from '../navigation/AuthContext';

// Local layout helper for the icon-label-control pattern repeated in the
// Notifications card; not shared outside this screen so it isn't in src/components.
function Row({ icon, label, children, c }) {
  return (
    <View style={[styles.row, { borderBottomColor: c.border }]}>
      <Ionicons name={icon} size={19} color={c.primary} />
      <Text style={[type.body, { color: c.textPrimary, flex: 1, marginLeft: 14 }]}>{label}</Text>
      {children}
    </View>
  );
}

export default function SettingsScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const { signOut } = useAuth();
  // Toggles are local-only (no persistence). readReceipts seeds from the
  // brand config's feature flag but becomes a normal, freely-toggleable
  // switch from then on — it doesn't write back to brand.json.
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [readReceipts, setReadReceipts] = useState(brand.features.readReceipts);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.background }} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      <Text style={[type.caption, { color: c.textSecondary, marginBottom: spacing.sm }]}>
        NOTIFICATIONS
      </Text>
      <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Row icon="notifications-outline" label="Push notifications" c={c}>
          <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: c.primary }} />
        </Row>
        <Row icon="volume-medium-outline" label="Message sound" c={c}>
          <Switch value={sound} onValueChange={setSound} trackColor={{ true: c.primary }} />
        </Row>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Ionicons name="checkmark-done-outline" size={19} color={c.primary} />
          <Text style={[type.body, { color: c.textPrimary, flex: 1, marginLeft: 14 }]}>
            Read receipts
          </Text>
          <Switch value={readReceipts} onValueChange={setReadReceipts} trackColor={{ true: c.primary }} />
        </View>
      </View>

      <Text style={[type.caption, { color: c.textSecondary, marginTop: spacing.xl, marginBottom: spacing.sm }]}>
        APPEARANCE
      </Text>
      <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border, padding: spacing.md }]}>
        <Text style={{ color: c.textSecondary, fontSize: 12, marginBottom: spacing.sm }}>
          This workspace's theme is set by your admin.
        </Text>
        <View style={styles.swatchRow}>
          {['primary', 'accent', 'success', 'danger'].map((key) => (
            <View key={key} style={styles.swatchItem}>
              <View style={[styles.swatch, { backgroundColor: c[key] }]} />
              <Text style={{ fontSize: 10, color: c.textSecondary, marginTop: 4 }}>{key}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={[type.caption, { color: c.textSecondary, marginTop: spacing.xl, marginBottom: spacing.sm }]}>
        SECURITY
      </Text>
      <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Ionicons name="lock-closed-outline" size={19} color={c.primary} />
          <Text style={[type.body, { color: c.textPrimary, flex: 1, marginLeft: 14 }]}>
            End-to-end encryption
          </Text>
          <View style={[styles.statusPill, { backgroundColor: brand.features.endToEndEncryption ? '#E4F5EC' : '#FBE8E5' }]}>
            <Text style={{ color: brand.features.endToEndEncryption ? c.success : c.danger, fontSize: 11, fontWeight: '700' }}>
              {brand.features.endToEndEncryption ? 'ON' : 'OFF'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutRow} onPress={() => signOut()}>
        <Ionicons name="log-out-outline" size={19} color={c.danger} />
        <Text style={{ color: c.danger, fontWeight: '600', marginLeft: 10 }}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  card: { borderWidth: 1, borderRadius: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: spacing.md, borderBottomWidth: 1 },
  swatchRow: { flexDirection: 'row', gap: 16 },
  swatchItem: { alignItems: 'center' },
  swatch: { width: 32, height: 32, borderRadius: 10 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  logoutRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
});
