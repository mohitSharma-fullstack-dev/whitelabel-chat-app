import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { users } from '../data/users';
import { chats } from '../data/chats';

export default function NewChatScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const [query, setQuery] = useState('');

  const filtered = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  const openChat = (userId) => {
    const existing = chats.find((ch) => ch.type === 'direct' && ch.userId === userId);
    navigation.replace('Conversation', { chatId: existing ? existing.id : 'c1' });
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>New message</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.searchBox, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Ionicons name="search" size={17} color={c.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: c.textPrimary }]}
          placeholder="Search people"
          placeholderTextColor={c.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <TouchableOpacity
        style={styles.newGroupRow}
        onPress={() => navigation.navigate('NewGroup')}
      >
        <View style={[styles.groupIcon, { backgroundColor: c.primaryLight }]}>
          <Ionicons name="people" size={20} color={c.primary} />
        </View>
        <Text style={[type.bodyMedium, { color: c.primary }]}>New group</Text>
      </TouchableOpacity>

      <Text style={[type.caption, { color: c.textSecondary, marginBottom: spacing.sm }]}>
        ALL PEOPLE
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => openChat(item.id)}>
            <Avatar
              initials={item.initials}
              color={item.avatarColor}
              online={item.online}
              photoUrl={item.avatarUrl}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={[type.h3, { color: c.textPrimary }]}>{item.name}</Text>
              <Text style={{ color: c.textSecondary, fontSize: 12.5 }}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, paddingTop: 56 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    marginBottom: spacing.lg,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  newGroupRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: spacing.lg },
  groupIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
});
