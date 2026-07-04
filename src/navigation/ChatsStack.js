import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import ConversationScreen from '../screens/ConversationScreen';
import NewChatScreen from '../screens/NewChatScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import ContactProfileScreen from '../screens/ContactProfileScreen';
import AttachmentPreviewScreen from '../screens/AttachmentPreviewScreen';
import SharedMediaScreen from '../screens/SharedMediaScreen';

const Stack = createNativeStackNavigator();

export default function ChatsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
      <Stack.Screen name="ContactProfile" component={ContactProfileScreen} />
      <Stack.Screen name="SharedMedia" component={SharedMediaScreen} />
      <Stack.Screen
        name="NewChat"
        component={NewChatScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="NewGroup"
        component={NewGroupScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="AttachmentPreview"
        component={AttachmentPreviewScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
