import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import { currentUser } from '../data/users';

export default function EditProfileScreen({ navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const [name, setName] = useState('Jordan Lee');
  const [status, setStatus] = useState(currentUser.status);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [saved, setSaved] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.background }} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>Edit profile</Text>
        <TouchableOpacity
          onPress={() => {
            setSaved(true);
            setTimeout(() => navigation.goBack(), 500);
          }}
        >
          <Text style={{ color: c.primary, fontWeight: '700' }}>{saved ? 'Saved' : 'Save'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.avatarWrap}>
        <Avatar
          initials={currentUser.initials}
          color={currentUser.avatarColor}
          size={90}
          photoUrl={currentUser.avatarUrl}
        />
        <TouchableOpacity style={[styles.cameraBtn, { backgroundColor: c.primary }]}>
          <Ionicons name="camera" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: c.textSecondary }]}>Name</Text>
      <TextInput
        style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.label, { color: c.textSecondary }]}>Status</Text>
      <TextInput
        style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
        value={status}
        onChangeText={setStatus}
      />

      <Text style={[styles.label, { color: c.textSecondary }]}>Email</Text>
      <TextInput
        style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={[styles.label, { color: c.textSecondary }]}>Phone</Text>
      <TextInput
        style={[styles.input, { borderColor: c.border, color: c.textPrimary }]}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  avatarWrap: { alignItems: 'center', marginBottom: spacing.xl },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: '38%',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: spacing.md },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
  },
});
