import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCC-brIwzPXN52uISsrqyoxOvaLfiv0gVw",
    authDomain: "vallera-vue.firebaseapp.com",
    projectId: "vallera-vue",
    storageBucket: "vallera-vue.firebasestorage.app",
    messagingSenderId: "748307709713",
    appId: "1:748307709713:web:2f03cdaef3badb40bfd6b0",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export const storage = getStorage(app);
