# Messenger Application

A real-time messaging application built with **React**, **Firebase**, **Zustand**, **React-Toastify**, and **Tailwind CSS**. This app allows users to create accounts, log in, send and receive messages, and manage their contacts, offering a seamless, interactive messaging experience.

## Features

- **User Authentication**: 
  - Sign up and log in with email and password via **Firebase Authentication**.
  - Profile creation with avatar upload and username setting.
  
- **Real-Time Messaging**: 
  - Instant messaging between users with **Firebase Firestore** for real-time updates.
  
- **User Status**: 
  - See the online/offline status of contacts and send messages instantly.
  - Ability to block users to prevent message interactions.
  
- **Contact Management**: 
  - Search for users and add them as contacts.
  - Blocked users cannot send messages.
  
- **Notifications**: 
  - **React-Toastify** is used to display notifications for success, errors, and other events like message receipt and account creation.
  
- **Responsive Design**: 
  - Styled with **Tailwind CSS**, the app is responsive and works well on both mobile and desktop devices.
  
- **State Management**: 
  - **Zustand** is used for global state management to handle authentication status, active chats, and message data.

## Tech Stack

- **React**: A popular JavaScript library for building user interfaces.
- **Firebase**: Firebase Authentication for user authentication and Firestore for real-time database.
- **Zustand**: A simple state management tool for managing global app state.
- **React-Toastify**: A library for displaying toast notifications to users.
- **Tailwind CSS**: A utility-first CSS framework for fast and efficient styling.

## Installation

To get started with the messenger app, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/messenger-app.git
    ```

2. Install dependencies:

    ```
    cd messenger-app
    npm install
    ```

3. Set up Firebase:
    - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    - Add your Firebase configuration to the `firebase.js` file.

4. Run the app:

    ```
    npm run dev
    ```

5. Open the app in your browser at `http://localhost:5173`.

## Usage

- **Sign Up**: Create an account by providing an email, password, and avatar. Choose a unique username.
- **Log In**: Use your email and password to log in to your account.
- **Send Messages**: After logging in, search for other users, send messages, and view their status.
- **Notifications**: Receive real-time notifications about messages, user actions, and errors.
