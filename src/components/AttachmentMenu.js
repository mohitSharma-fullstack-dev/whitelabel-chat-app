import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, spacing, radius, type } from '../theme/ThemeContext';

const OPTIONS = [
  { key: 'camera', label: 'Camera', icon: 'camera-outline' },
  { key: 'gallery', label: 'Photo & Video Library', icon: 'images-outline' },
  { key: 'document', label: 'Browse Files', icon: 'folder-outline' },
];

// Bottom-sheet modal (camera / gallery / file) shown from ConversationScreen's
// "+" button. Actual permission requests and picker calls live in the
// screen's handleAttachOption — this component is presentation-only.
export default function AttachmentMenu({ visible, onClose, onSelect }) {
  const brand = useBrand();
  const c = brand.colors;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: c.surface }]} onPress={() => {}}>
          <View style={styles.handle} />
          <Text style={[type.h3, { color: c.textPrimary, marginBottom: spacing.md }]}>
            Add attachment
          </Text>
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={styles.row}
              onPress={() => onSelect(opt.key)}
            >
              <View style={[styles.iconWrap, { backgroundColor: c.primaryLight }]}>
                <Ionicons name={opt.icon} size={20} color={c.primary} />
              </View>
              <Text style={[type.body, { color: c.textPrimary }]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.cancelBtn, { borderColor: c.border }]} onPress={onClose}>
            <Text style={[type.bodyMedium, { color: c.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D8D8D8',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: 12,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 13,
    alignItems: 'center',
  },
});
