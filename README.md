# 📱 React Native ToDo App

A minimalistic and modern ToDo List mobile application built with **React Native + Expo**. This app supports persistent storage, navigation, splash screen, toast messages, modal input, and Dark Mode — designed following modern UI principles.

---

## ✨ Features

- 📋 Add, check, uncheck and delete tasks
- 💾 Task persistence using AsyncStorage
- 🌓 Dark mode support
- 🌊 Smooth splash screen (via `expo-splash-screen`)
- 🚀 Toast notifications (via `react-native-toast-message`)
- 🧭 Navigation with React Navigation
- 📦 Modal for adding tasks
- 🎨 Clean UI with Flat Design & Material Light influences
- ✅ Fully wrapped in SafeAreaView and KeyboardAvoidingView

---

## 🛠️ Installation

### Prerequisites
- Node.js
- Expo CLI: `npm install -g expo-cli`

```bash
# Clone the repo
https://github.com/your-username/todo-rn-app.git

# Navigate into the folder
cd todo-rn-app

# Install dependencies
npm install

# Start the app
npx expo start
```

Open it on:
- iOS: Expo Go App (App Store)
- Android: Expo Go App (Google Play)
- Web: Press "w" in the terminal

---

## 📂 Project Structure

```
.
├── App.js
├── components
│   ├── ModalAddTask.js
│   └── TaskItem.js
├── screens
│   └── TodoScreen.js
└── assets
    └── splash.png
```

---

## 📚 Libraries Used

| Package | Purpose |
|--------|---------|
| `react-navigation/native` | App navigation |
| `react-native-toast-message` | Toast notifications |
| `react-native-reanimated` | Animations |
| `@react-native-async-storage/async-storage` | Data persistence |
| `expo-splash-screen` | Splash screen |
| `@expo/vector-icons` | Icons |

---

## 💡 Customization
You can easily extend this app to:
- ⏰ Add due dates and reminders
- 🗃️ Group tasks by categories
- ☁️ Connect to a backend API (Node.js/.NET)
- 💬 Add user accounts with authentication

---

## 🧑‍💻 Author
Ayala – Built as part of a final React Native project 🧡

---

## 📜 License
This project is open-source. Do anything you like with it!

