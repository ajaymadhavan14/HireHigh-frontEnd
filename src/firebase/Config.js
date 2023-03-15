import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhmZL_YhWFAGPCXa2CUjzNpl66xTIsbr0',
  authDomain: 'hirehigh-d7a07.firebaseapp.com',
  projectId: 'hirehigh-d7a07',
  storageBucket: 'hirehigh-d7a07.appspot.com',
  messagingSenderId: '1002767999596',
  appId: '1:1002767999596:web:e3a1e5072785843e2d2e49',
  measurementId: 'G-G12Z7N9SBV',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

export default app;
