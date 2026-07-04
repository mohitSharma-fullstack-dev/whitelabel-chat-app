import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import { findChat } from '../data/chats';

const TABS = [
  { key: 'media', label: 'Media' },
  { key: 'files', label: 'Files' },
];

export default function SharedMediaScreen({ route, navigation }) {
  const { chatId } = route.params;
  const brand = useBrand();
  const c = brand.colors;
  const chat = findChat(chatId);
  const [tab, setTab] = useState('media');

  // Derives both tabs' contents from the same message list rather than
  // fetching separately, since there's no dedicated media/files endpoint.
  const media = useMemo(
    () => chat.messages.filter((m) => m.kind === 'image' || m.kind === 'video'),
    [chat]
  );
  const files = useMemo(() => chat.messages.filter((m) => m.kind === 'file'), [chat]);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>Shared media</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={[styles.tabRow, { borderColor: c.border }]}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabBtn, tab === t.key && { borderBottomColor: c.primary, borderBottomWidth: 2 }]}
            onPress={() => setTab(t.key)}
          >
            <Text
              style={[
                type.bodyMedium,
                { color: tab === t.key ? c.primary : c.textSecondary },
              ]}
            >
              {t.label} ({t.key === 'media' ? media.length : files.length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'media' ? (
        <FlatList
          data={media}
          key="media-grid"
          numColumns={3}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.sm }}
          renderItem={({ item }) => (
            <View style={[styles.tile, { backgroundColor: c.surface, borderColor: c.border }]}>
              {item.uri ? (
                <Image source={{ uri: item.uri }} style={styles.tileImage} resizeMode="cover" />
              ) : (
                <Ionicons
                  name={item.kind === 'video' ? 'videocam-outline' : 'image-outline'}
                  size={26}
                  color={c.textSecondary}
                />
              )}
              {item.kind === 'video' && (
                <View style={styles.tilePlayBadge}>
                  <Ionicons name="play" size={12} color="#fff" />
                </View>
              )}
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="images-outline" size={32} color={c.textSecondary} />
              <Text style={{ color: c.textSecondary, marginTop: spacing.sm }}>No shared media yet</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={files}
          key="files-list"
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.lg }}
          renderItem={({ item }) => (
            <View style={styles.fileRow}>
              <View style={[styles.fileIcon, { backgroundColor: c.primaryLight }]}>
                <Ionicons name="document-text-outline" size={20} color={c.primary} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[type.bodyMedium, { color: c.textPrimary }]} numberOfLines={1}>
                  {item.fileName}
                </Text>
                <Text style={{ color: c.textSecondary, fontSize: 12, marginTop: 2 }}>
                  {item.fileSize} · {item.time}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="document-outline" size={32} color={c.textSecondary} />
              <Text style={{ color: c.textSecondary, marginTop: spacing.sm }}>No shared files yet</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 56 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, paddingHorizontal: spacing.lg },
  tabBtn: { paddingVertical: 10, marginRight: spacing.xl },
  tile: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 3,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tileImage: { width: '100%', height: '100%' },
  tilePlayBadge: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  fileIcon: { width: 38, height: 38, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', marginTop: 60 },
});
