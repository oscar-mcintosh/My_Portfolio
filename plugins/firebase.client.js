// plugins/firebase.client.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '~/firebase.config';

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = getFirestore(app);
  
  // Initialize Realtime Database
  const realtimeDb = getDatabase(app);
  
  // Initialize Storage
  const storage = getStorage(app);

  return {
    provide: {
      firebase: app,
      firestore: db,
      realtimeDb: realtimeDb,
      storage: storage
    }
  };
});
