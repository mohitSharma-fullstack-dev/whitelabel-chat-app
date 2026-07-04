import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { findUser } from '../data/users';
import { findChat } from '../data/chats';
import { useChatSettings } from '../navigation/ChatSettingsContext';

export default function ContactProfileScreen({ route, navigation }) {
  const { userId, chatId } = route.params;
  const brand = useBrand();
  const c = brand.colors;
  const user = findUser(userId);
  const { isMuted, toggleMute } = useChatSettings();
  const muted = isMuted(chatId);
  const chat = findChat(chatId);
  const mediaCount = chat.messages.filter((m) => m.kind === 'image' || m.kind === 'video' || m.kind === 'file').length;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>Contact info</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.hero}>
        <Avatar
          initials={user.initials}
          color={user.avatarColor}
          size={90}
          online={user.online}
          photoUrl={user.avatarUrl}
        />
        <Text style={[type.h2, { color: c.textPrimary, marginTop: spacing.md }]}>{user.name}</Text>
        <Text style={{ color: c.textSecondary, marginTop: 4 }}>{user.status}</Text>
      </View>

      <View style={styles.actionsRow}>
        {[
          { icon: 'chatbubble-outline', label: 'Message', onPress: () => navigation.goBack() },
          { icon: 'call-outline', label: 'Call' },
          { icon: 'videocam-outline', label: 'Video' },
          {
            icon: muted ? 'notifications-off' : 'notifications-outline',
            label: muted ? 'Muted' : 'Mute',
            onPress: () => toggleMute(chatId),
            active: muted,
          },
        ].map((a) => (
          <TouchableOpacity key={a.label} style={styles.actionItem} onPress={a.onPress}>
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: a.active ? c.primary : c.primaryLight },
              ]}
            >
              <Ionicons name={a.icon} size={19} color={a.active ? '#fff' : c.primary} />
            </View>
            <Text style={{ color: c.textSecondary, fontSize: 12, marginTop: 6 }}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.mediaRow, { backgroundColor: c.surface, borderColor: c.border }]}
        onPress={() => navigation.navigate('SharedMedia', { chatId })}
      >
        <View style={[styles.mediaIcon, { backgroundColor: c.primaryLight }]}>
          <Ionicons name="images-outline" size={18} color={c.primary} />
        </View>
        <Text style={[type.bodyMedium, { color: c.textPrimary, flex: 1, marginLeft: 12 }]}>
          Media, links and docs
        </Text>
        <Text style={{ color: c.textSecondary, fontSize: 13, marginRight: 4 }}>{mediaCount}</Text>
        <Ionicons name="chevron-forward" size={16} color={c.textSecondary} />
      </TouchableOpacity>

      <View style={[styles.infoCard, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={18} color={c.textSecondary} />
          <Text style={[styles.infoText, { color: c.textPrimary }]}>
            {user.name.toLowerCase().replace(' ', '.')}@example.com
          </Text>
        </View>
        <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: c.border, paddingTop: spacing.md }]}>
          <Ionicons name="time-outline" size={18} color={c.textSecondary} />
          <Text style={[styles.infoText, { color: c.textPrimary }]}>
            {user.online ? 'Online now' : `Last seen ${user.lastSeen || 'recently'}`}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.dangerRow}>
        <Ionicons name="ban-outline" size={18} color={c.danger} />
        <Text style={{ color: c.danger, marginLeft: 10, fontWeight: '600' }}>Block {user.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, paddingTop: 56 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  hero: { alignItems: 'center', marginBottom: spacing.lg },
  actionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: spacing.xl },
  actionItem: { alignItems: 'center' },
  actionIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  mediaIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoCard: { borderWidth: 1, borderRadius: 16, padding: spacing.lg, gap: spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { fontSize: 14 },
  dangerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl },
});
