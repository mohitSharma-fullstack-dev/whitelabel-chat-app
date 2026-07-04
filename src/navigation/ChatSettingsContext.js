import React, { createContext, useContext, useMemo, useState } from 'react';

// In production, mute preferences would sync to the backend
// (e.g. PATCH /chats/:id/settings). For this static demo they
// just live in memory for the current app session.

const ChatSettingsContext = createContext(null);

export function ChatSettingsProvider({ children }) {
  const [mutedChatIds, setMutedChatIds] = useState(() => new Set());

  const value = useMemo(
    () => ({
      isMuted: (chatId) => mutedChatIds.has(chatId),
      toggleMute: (chatId) =>
        setMutedChatIds((prev) => {
          const next = new Set(prev);
          if (next.has(chatId)) next.delete(chatId);
          else next.add(chatId);
          return next;
        }),
    }),
    [mutedChatIds]
  );

  return <ChatSettingsContext.Provider value={value}>{children}</ChatSettingsContext.Provider>;
}

export function useChatSettings() {
  return useContext(ChatSettingsContext);
}
