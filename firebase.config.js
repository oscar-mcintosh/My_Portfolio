// firebase.config.js
// This file exports the Firebase configuration
// It can be used in both client and server contexts

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || import.meta.env?.FIREBASE_API_KEY || "AIzaSyBxpFhxfwAFzwxRx0xA2lomY2NRugufUrY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || import.meta.env?.FIREBASE_AUTH_DOMAIN || "twofortytwo-16fb2.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL || import.meta.env?.FIREBASE_DATABASE_URL || "https://twofortytwo-16fb2-default-rtdb.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || import.meta.env?.FIREBASE_PROJECT_ID || "twofortytwo-16fb2",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || import.meta.env?.FIREBASE_STORAGE_BUCKET || "twofortytwo-16fb2.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || import.meta.env?.FIREBASE_MESSAGING_SENDER_ID || "119815109429",
  appId: process.env.FIREBASE_APP_ID || import.meta.env?.FIREBASE_APP_ID || "1:119815109429:web:e05faa089f27677b0eea7c"
};
