// composables/useFirebase.js
// Composable for easy Firebase access in components

export const useFirebase = () => {
  const { $firebase, $firestore, $realtimeDb, $storage } = useNuxtApp();
  
  return {
    app: $firebase,
    firestore: $firestore,
    realtimeDb: $realtimeDb,
    storage: $storage
  };
};
