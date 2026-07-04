import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { findGroup, findChat } from '../data/chats';
import { findUser, currentUser } from '../data/users';
import { useChatSettings } from '../navigation/ChatSettingsContext';

export default function GroupInfoScreen({ route, navigation }) {
  const { groupId, chatId } = route.params;
  const brand = useBrand();
  const c = brand.colors;
  const group = findGroup(groupId);
  const members = group.memberIds.map((id) => (id === 'me' ? currentUser : findUser(id)));
  // Mute state lives in ChatSettingsContext (keyed by chatId) rather than on
  // the group/chat data itself, since it's a per-viewer preference, not shared group state.
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
        <Text style={[type.h3, { color: c.textPrimary }]}>Group info</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.hero}>
        <Avatar initials={group.initials} color={group.avatarColor} size={84} isGroup />
        <Text style={[type.h2, { color: c.textPrimary, marginTop: spacing.md }]}>{group.name}</Text>
        <Text style={{ color: c.textSecondary, marginTop: 4, textAlign: 'center', paddingHorizontal: spacing.lg }}>
          {group.description}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        {[
          {
            icon: muted ? 'notifications-off' : 'notifications-outline',
            label: muted ? 'Muted' : 'Mute',
            onPress: () => toggleMute(chatId),
            active: muted,
          },
          { icon: 'search-outline', label: 'Search' },
          { icon: 'exit-outline', label: 'Leave' },
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

      <View style={styles.membersHeader}>
        <Text style={[type.caption, { color: c.textSecondary }]}>{members.length} MEMBERS</Text>
        <TouchableOpacity>
          <Text style={{ color: c.primary, fontWeight: '600', fontSize: 13 }}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Avatar
              initials={item.initials}
              color={item.avatarColor}
              size={40}
              online={item.online}
              photoUrl={item.avatarUrl}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[type.bodyMedium, { color: c.textPrimary }]}>
                {item.id === 'u0' ? 'You' : item.name}
              </Text>
              {item.id === group.createdBy && (
                <Text style={{ color: c.textSecondary, fontSize: 12 }}>Group admin</Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, paddingTop: 56 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  hero: { alignItems: 'center', marginBottom: spacing.lg },
  actionsRow: { flexDirection: 'row', justifyContent: 'center', gap: 36, marginBottom: spacing.xl },
  actionItem: { alignItems: 'center' },
  actionIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  mediaIcon: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  membersHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  memberRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
});
