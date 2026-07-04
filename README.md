# Nimbus — White-Label Chat App (Mobile)

A React Native (Expo) mobile chat app UI concept. **All data is static/mocked** — there is no backend wired up yet. This is a UI/UX and architecture concept for discussion, not a production build.

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android), or press `w` for a web preview.

## What's here

14 screens, fully navigable:

**Auth & onboarding** — Splash, Login (email/password + Google/Apple buttons, UI only), Sign up, Forgot password

**Core chat** — Chat list (1-on-1 + group, search, pinned, unread badges), Conversation (text bubbles, typing indicator, read receipts, file/image messages), Attachment preview & send, New chat, New group (multi-select + name), Group info (members, admin badge, leave/mute)

**Profile & settings** — My profile, Edit profile, Settings (notification toggles, read receipts, encryption status), Contact profile (tap any user)

## White-label architecture

Everything brand-specific lives in **`src/theme/brand.json`**: app name, tagline, logo initial, full color palette, and feature flags (`endToEndEncryption`, `fileSharing`, `readReceipts`, `typingIndicators`, `maxFileUploadMb`). Every screen reads colors and copy from this file via `useBrand()` — nothing is hardcoded per-client.

In production, this file becomes an API response (`GET /config/branding`) fetched once at launch and cached — exactly what the admin dashboard's Branding page is designed to configure. Swap the JSON, get a re-skinned app with zero code changes.

## Mock data

`src/data/users.js` and `src/data/chats.js` hold the static dataset (6 users, 6 conversations, 2 groups, full message history). Replace these with real API calls when the backend is ready — screen components don't need to change, just the data-fetching layer.

## Not included (by design, per current scope)

- No real authentication, push notifications, or file uploads (all UI-only)
- No backend/API calls — this ships as static data
- No Node.js code — that's a separate phase
