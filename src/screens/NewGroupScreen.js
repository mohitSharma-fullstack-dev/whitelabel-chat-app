import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { users } from '../data/users';

export default function NewGroupScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const [selectedIds, setSelectedIds] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [step, setStep] = useState('members'); // members -> name

  const toggle = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (step === 'name' ? setStep('members') : navigation.goBack())}>
          <Ionicons name={step === 'name' ? 'arrow-back' : 'close'} size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>
          {step === 'members' ? 'Add members' : 'Name your group'}
        </Text>
        <TouchableOpacity
          disabled={step === 'members' ? selectedIds.length === 0 : !groupName.trim()}
          onPress={() =>
            step === 'members' ? setStep('name') : navigation.replace('Conversation', { chatId: 'c2' })
          }
        >
          <Text
            style={{
              color: (step === 'members' ? selectedIds.length > 0 : groupName.trim())
                ? c.primary
                : c.border,
              fontWeight: '700',
              fontSize: 15,
            }}
          >
            {step === 'members' ? 'Next' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>

      {step === 'members' ? (
        <>
          <Text style={{ color: c.textSecondary, marginBottom: spacing.md }}>
            {selectedIds.length} selected
          </Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const active = selectedIds.includes(item.id);
              return (
                <TouchableOpacity style={styles.row} onPress={() => toggle(item.id)}>
                  <Avatar
                    initials={item.initials}
                    color={item.avatarColor}
                    online={item.online}
                    photoUrl={item.avatarUrl}
                  />
                  <Text style={[type.h3, { color: c.textPrimary, flex: 1, marginLeft: 12 }]}>
                    {item.name}
                  </Text>
                  <Ionicons
                    name={active ? 'checkmark-circle' : 'ellipse-outline'}
                    size={22}
                    color={active ? c.primary : c.border}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </>
      ) : (
        <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
          <View style={[styles.groupAvatarPlaceholder, { backgroundColor: c.primaryLight }]}>
            <Ionicons name="camera-outline" size={26} color={c.primary} />
          </View>
          <TextInput
            style={[styles.nameInput, { borderColor: c.border, color: c.textPrimary }]}
            placeholder="Group name"
            placeholderTextColor={c.textSecondary}
            value={groupName}
            onChangeText={setGroupName}
          />
          <Text style={{ color: c.textSecondary, marginTop: spacing.lg }}>
            {selectedIds.length} members added
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, paddingTop: 56 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  groupAvatarPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  nameInput: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
  },
});
