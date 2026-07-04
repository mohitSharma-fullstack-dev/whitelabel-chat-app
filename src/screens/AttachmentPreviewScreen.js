import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, type, spacing, radius } from '../theme/ThemeContext';

const KIND_ICON = { image: 'image', video: 'videocam', file: 'document-text' };

export default function AttachmentPreviewScreen({ route, navigation }) {
  const brand = useBrand();
  const c = brand.colors;
  const { attachment, onSend } = route.params;
  const [caption, setCaption] = useState('');
  const [sent, setSent] = useState(false);

  const sizeMb = attachment.fileSize && attachment.fileSize.endsWith('MB')
    ? parseFloat(attachment.fileSize)
    : 0;
  const overLimit = brand.features.fileSharing && sizeMb > brand.features.maxFileUploadMb;
  const canSend = brand.features.fileSharing && !overLimit && !sent;

  const handleSend = () => {
    if (!canSend) return;
    setSent(true);
    const msg = {
      id: `m${Date.now()}`,
      from: 'me',
      kind: attachment.kind,
      uri: attachment.uri,
      fileName: attachment.fileName,
      fileSize: attachment.fileSize,
      text: caption.trim() || undefined,
      time: 'Now',
      status: 'sent',
    };
    setTimeout(() => {
      onSend?.(msg);
      navigation.goBack();
    }, 500);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[type.h3, { color: c.textPrimary }]}>Send attachment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View
        style={[
          styles.previewBox,
          { backgroundColor: c.surface, borderColor: c.border },
          attachment.kind === 'image' && attachment.uri && { paddingVertical: 0, paddingTop: 0 },
        ]}
      >
        {attachment.kind === 'image' && attachment.uri ? (
          <Image source={{ uri: attachment.uri }} style={styles.previewImage} resizeMode="cover" />
        ) : (
          <Ionicons name={KIND_ICON[attachment.kind] || 'document-text'} size={54} color={c.primary} />
        )}
        <Text style={[type.bodyMedium, { color: c.textPrimary, marginTop: spacing.md }]} numberOfLines={1}>
          {attachment.fileName}
        </Text>
        {!!attachment.fileSize && (
          <Text style={{ color: c.textSecondary, fontSize: 12, marginTop: 2 }}>{attachment.fileSize}</Text>
        )}
        {!brand.features.fileSharing && (
          <Text style={{ color: c.danger, fontSize: 12, marginTop: spacing.sm }}>
            File sharing is disabled by your workspace admin.
          </Text>
        )}
        {brand.features.fileSharing && overLimit && (
          <Text style={{ color: c.danger, fontSize: 12, marginTop: spacing.sm }}>
            This file exceeds the {brand.features.maxFileUploadMb} MB limit.
          </Text>
        )}
      </View>

      <TextInput
        style={[styles.captionInput, { borderColor: c.border, color: c.textPrimary }]}
        placeholder="Add a caption…"
        placeholderTextColor={c.textSecondary}
        value={caption}
        onChangeText={setCaption}
      />

      {brand.features.endToEndEncryption && (
        <View style={styles.encryptedRow}>
          <Ionicons name="lock-closed" size={13} color={c.textSecondary} />
          <Text style={{ color: c.textSecondary, fontSize: 12, marginLeft: 5 }}>
            End-to-end encrypted
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.sendButton, { backgroundColor: canSend ? c.primary : c.border }]}
        onPress={handleSend}
        disabled={!canSend}
      >
        <Ionicons name={sent ? 'checkmark' : 'send'} size={17} color="#fff" />
        <Text style={styles.sendButtonText}>{sent ? 'Sent' : 'Send'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, paddingTop: 56 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  previewBox: {
    borderWidth: 1,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: radius.md,
  },
  captionInput: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 14,
    marginTop: spacing.lg,
  },
  encryptedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
  sendButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: 15,
    marginTop: spacing.xl,
  },
  sendButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
