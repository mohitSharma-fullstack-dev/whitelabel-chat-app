import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChatsStack from './ChatsStack';
import ProfileStack from './ProfileStack';
import { useBrand } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const brand = useBrand();
  const c = brand.colors;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textSecondary,
        tabBarStyle: { borderTopColor: c.border, backgroundColor: c.surface },
        tabBarIcon: ({ color, size }) => {
          const name = route.name === 'ChatsTab' ? 'chatbubbles' : 'person-circle';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ChatsTab" component={ChatsStack} options={{ title: 'Chats' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
