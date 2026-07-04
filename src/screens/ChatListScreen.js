import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { chats } from '../data/chats';
import { findUser } from '../data/users';
import { findGroup } from '../data/chats';
import { useChatSettings } from '../navigation/ChatSettingsContext';

// Normalizes a direct chat (linked to a user) or group chat (linked to a
// group) into the same shape the row renderer expects, so the FlatList
// doesn't need to branch on chat.type.
function getChatMeta(chat) {
  if (chat.type === 'direct') {
    const user = findUser(chat.userId);
    return {
      name: user.name,
      initials: user.initials,
      color: user.avatarColor,
      online: user.online,
      photoUrl: user.avatarUrl,
    };
  }
  const group = findGroup(chat.groupId);
  return { name: group.name, initials: group.initials, color: group.avatarColor, online: undefined, isGroup: true };
}

export default function ChatListScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const [query, setQuery] = useState('');
  const { isMuted } = useChatSettings();

  // Recomputed only when the search query changes: build a preview string per
  // chat (last message text, or an icon+label for file/image), filter by name,
  // then float pinned chats to the top while preserving original order otherwise.
  const rows = useMemo(() => {
    const withMeta = chats.map((chat) => {
      const meta = getChatMeta(chat);
      const last = chat.messages[chat.messages.length - 1];
      const preview =
        last.kind === 'file'
          ? `📎 ${last.fileName}`
          : last.kind === 'image'
          ? '📷 Photo'
          : last.text;
      return { ...chat, ...meta, preview, time: last.time };
    });
    const filtered = query
      ? withMeta.filter((c2) => c2.name.toLowerCase().includes(query.toLowerCase()))
      : withMeta;
    return filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [query]);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <Text style={[type.h1, { color: c.textPrimary }]}>Chats</Text>
        <TouchableOpacity
          style={[styles.newBtn, { backgroundColor: c.primary }]}
          onPress={() => navigation.navigate('NewChat')}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Ionicons name="search" size={17} color={c.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: c.textPrimary }]}
          placeholder="Search chats"
          placeholderTextColor={c.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Conversation', { chatId: item.id })}
          >
            <Avatar
              initials={item.initials}
              color={item.color}
              online={item.online}
              photoUrl={item.photoUrl}
              isGroup={item.isGroup}
            />
            <View style={styles.rowText}>
              <View style={styles.rowTop}>
                <Text
                  style={[type.h3, { color: c.textPrimary }]}
                  numberOfLines={1}
                >
                  {item.pinned ? '📌 ' : ''}
                  {item.name}
                </Text>
                <View style={styles.rowTopRight}>
                  {isMuted(item.id) && (
                    <Ionicons name="notifications-off" size={13} color={c.textSecondary} style={{ marginRight: 4 }} />
                  )}
                  <Text style={[type.small, { color: c.textSecondary }]}>{item.time}</Text>
                </View>
              </View>
              <View style={styles.rowBottom}>
                <Text
                  style={[
                    type.caption,
                    {
                      color: item.unread ? c.textPrimary : c.textSecondary,
                      fontWeight: item.unread ? '600' : '400',
                      flex: 1,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {item.preview}
                </Text>
                {item.unread > 0 && (
                  <View style={[styles.badge, { backgroundColor: isMuted(item.id) ? c.textSecondary : c.accent }]}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: c.textSecondary }}>No chats match "{query}"</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: spacing.lg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  newBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    marginBottom: spacing.md,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rowText: { flex: 1 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowTopRight: { flexDirection: 'row', alignItems: 'center' },
  rowBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 8 },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 60 },
});
