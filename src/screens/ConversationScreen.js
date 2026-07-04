import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useBrand, spacing, radius } from '../theme/ThemeContext';
import Avatar from '../components/Avatar';
import AttachmentMenu from '../components/AttachmentMenu';
import { findChat, findGroup } from '../data/chats';
import { findUser } from '../data/users';

function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getHeaderMeta(chat) {
  if (chat.type === 'direct') {
    const user = findUser(chat.userId);
    return {
      name: user.name,
      subtitle: user.online ? 'Online' : `Last seen ${user.lastSeen || ''}`,
      initials: user.initials,
      color: user.avatarColor,
      online: user.online,
      photoUrl: user.avatarUrl,
    };
  }
  const group = findGroup(chat.groupId);
  return {
    name: group.name,
    subtitle: `${group.memberIds.length} members`,
    initials: group.initials,
    color: group.avatarColor,
    isGroup: true,
  };
}

function StatusTick({ status, color }) {
  if (status === 'read') return <Ionicons name="checkmark-done" size={14} color={color} />;
  if (status === 'delivered') return <Ionicons name="checkmark-done" size={14} color="rgba(255,255,255,0.7)" />;
  return <Ionicons name="checkmark" size={14} color="rgba(255,255,255,0.7)" />;
}

export default function ConversationScreen({ route, navigation }) {
  const { chatId } = route.params;
  const brand = useBrand();
  const c = brand.colors;
  const chat = findChat(chatId);
  const meta = getHeaderMeta(chat);
  const [messages, setMessages] = useState(chat.messages);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(chat.type === 'direct');
  const [attachMenuVisible, setAttachMenuVisible] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setTyping(false), 2600);
    return () => clearTimeout(t);
  }, [typing]);

  const send = () => {
    if (!draft.trim()) return;
    const msg = {
      id: `m${Date.now()}`,
      from: 'me',
      text: draft.trim(),
      time: 'Now',
      status: 'sent',
    };
    setMessages((prev) => [...prev, msg]);
    setDraft('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const appendMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const openAttachmentPreview = (attachment) => {
    setAttachMenuVisible(false);
    navigation.navigate('AttachmentPreview', {
      chatId,
      attachment,
      onSend: appendMessage,
    });
  };

  const handleAttachOption = async (option) => {
    try {
      if (option === 'camera') {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
          setAttachMenuVisible(false);
          Alert.alert('Camera access needed', 'Enable camera access in Settings to take a photo.');
          return;
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
        if (result.canceled) return setAttachMenuVisible(false);
        const asset = result.assets[0];
        openAttachmentPreview({
          kind: 'image',
          uri: asset.uri,
          fileName: asset.fileName || 'photo.jpg',
          fileSize: formatBytes(asset.fileSize),
        });
      } else if (option === 'gallery') {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
          setAttachMenuVisible(false);
          Alert.alert('Photo library access needed', 'Enable photo library access in Settings to choose media.');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          quality: 0.7,
        });
        if (result.canceled) return setAttachMenuVisible(false);
        const asset = result.assets[0];
        const kind = asset.type === 'video' ? 'video' : 'image';
        openAttachmentPreview({
          kind,
          uri: asset.uri,
          fileName: asset.fileName || (kind === 'video' ? 'video.mp4' : 'photo.jpg'),
          fileSize: formatBytes(asset.fileSize),
        });
      } else if (option === 'document') {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });
        if (result.canceled) return setAttachMenuVisible(false);
        const asset = result.assets[0];
        openAttachmentPreview({
          kind: 'file',
          uri: asset.uri,
          fileName: asset.name,
          fileSize: formatBytes(asset.size),
        });
      }
    } catch (e) {
      setAttachMenuVisible(false);
      Alert.alert('Could not attach file', 'Something went wrong picking that attachment. Please try again.');
    }
  };

  const infoRoute = chat.type === 'group' ? 'GroupInfo' : 'ContactProfile';
  const infoParams =
    chat.type === 'group'
      ? { groupId: chat.groupId, chatId: chat.id }
      : { userId: chat.userId, chatId: chat.id };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerCenter}
          onPress={() => navigation.navigate(infoRoute, infoParams)}
        >
          <Avatar
            initials={meta.initials}
            color={meta.color}
            size={36}
            online={meta.online}
            photoUrl={meta.photoUrl}
            isGroup={meta.isGroup}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.headerName, { color: c.textPrimary }]}>{meta.name}</Text>
            <Text style={[styles.headerSubtitle, { color: typing ? c.primary : c.textSecondary }]}>
              {typing ? 'typing…' : meta.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={21} color={c.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl }}
        renderItem={({ item }) => {
          const mine = item.from === 'me';
          const bubbleColor = mine ? c.bubbleOutgoing : c.bubbleIncoming;
          const textColor = mine ? c.textInverse : c.textPrimary;
          return (
            <View style={[styles.bubbleRow, { justifyContent: mine ? 'flex-end' : 'flex-start' }]}>
              <View
                style={[
                  styles.bubble,
                  { backgroundColor: bubbleColor, borderBottomRightRadius: mine ? 4 : radius.lg, borderBottomLeftRadius: mine ? radius.lg : 4 },
                ]}
              >
                {item.kind === 'file' && (
                  <View style={styles.fileRow}>
                    <View style={[styles.fileIcon, { backgroundColor: mine ? 'rgba(255,255,255,0.2)' : c.primaryLight }]}>
                      <Ionicons name="document-text-outline" size={18} color={mine ? '#fff' : c.primary} />
                    </View>
                    <View>
                      <Text style={{ color: textColor, fontWeight: '600', fontSize: 13 }}>{item.fileName}</Text>
                      <Text style={{ color: mine ? 'rgba(255,255,255,0.75)' : c.textSecondary, fontSize: 11 }}>{item.fileSize}</Text>
                    </View>
                  </View>
                )}
                {item.kind === 'image' && (
                  item.uri ? (
                    <Image source={{ uri: item.uri }} style={styles.imagePlaceholder} resizeMode="cover" />
                  ) : (
                    <View style={[styles.imagePlaceholder, { backgroundColor: mine ? 'rgba(255,255,255,0.15)' : c.border }]}>
                      <Ionicons name="image-outline" size={26} color={mine ? '#fff' : c.textSecondary} />
                    </View>
                  )
                )}
                {item.kind === 'video' && (
                  <View style={[styles.imagePlaceholder, { backgroundColor: mine ? 'rgba(255,255,255,0.15)' : c.border }]}>
                    <Ionicons name="play-circle" size={36} color={mine ? '#fff' : c.textSecondary} />
                  </View>
                )}
                {item.text && <Text style={{ color: textColor, fontSize: 15 }}>{item.text}</Text>}
                <View style={styles.bubbleFooter}>
                  <Text style={{ color: mine ? 'rgba(255,255,255,0.7)' : c.textSecondary, fontSize: 10.5, marginRight: 4 }}>
                    {item.time}
                  </Text>
                  {mine && <StatusTick status={item.status} color="#8FE3C7" />}
                </View>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          typing ? (
            <View style={[styles.bubbleRow, { justifyContent: 'flex-start' }]}>
              <View style={[styles.bubble, { backgroundColor: c.bubbleIncoming, flexDirection: 'row', gap: 4 }]}>
                <View style={[styles.typingDot, { backgroundColor: c.textSecondary }]} />
                <View style={[styles.typingDot, { backgroundColor: c.textSecondary }]} />
                <View style={[styles.typingDot, { backgroundColor: c.textSecondary }]} />
              </View>
            </View>
          ) : null
        }
      />

      <View style={[styles.inputBar, { borderTopColor: c.border, backgroundColor: c.surface }]}>
        <TouchableOpacity
          style={styles.attachBtn}
          onPress={() => setAttachMenuVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={26} color={c.primary} />
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput, { color: c.textPrimary, backgroundColor: c.background }]}
          placeholder="Message"
          placeholderTextColor={c.textSecondary}
          value={draft}
          onChangeText={setDraft}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: draft.trim() ? c.primary : c.border }]}
          onPress={send}
          disabled={!draft.trim()}
        >
          <Ionicons name="send" size={17} color="#fff" />
        </TouchableOpacity>
      </View>

      <AttachmentMenu
        visible={attachMenuVisible}
        onClose={() => setAttachMenuVisible(false)}
        onSelect={handleAttachOption}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 12 },
  headerName: { fontSize: 15.5, fontWeight: '700' },
  headerSubtitle: { fontSize: 12, marginTop: 1 },
  bubbleRow: { flexDirection: 'row', marginBottom: 10 },
  bubble: { maxWidth: '78%', borderRadius: radius.lg, paddingHorizontal: 13, paddingVertical: 9 },
  bubbleFooter: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 4 },
  fileRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  fileIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  imagePlaceholder: {
    width: 180,
    height: 130,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  typingDot: { width: 6, height: 6, borderRadius: 3, opacity: 0.6 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    borderTopWidth: 1,
    gap: 8,
  },
  attachBtn: { paddingBottom: 8 },
  textInput: {
    flex: 1,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
